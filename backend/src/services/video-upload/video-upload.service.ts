import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as ffmpeg from 'fluent-ffmpeg';
import { MinioClientService } from '@shared/minio/minio-client.service';
import { IMulterFile } from '@shared/interfaces';
@Injectable()
export class VideoUploadService {
    constructor(
        private minioClientService: MinioClientService
    ) { }

    async uploadSingle(originalFile: IMulterFile) {

        const s3Path_bucket = "users";
        const s3path_folder_base = `videos`;
        const s3path_folder_date = `${moment(new Date()).format("YYYY-MM-DD-HH-mm")}`;
        const s3path_folder_fileId = `${this.makeid(12)}`;
        const s3path_folder = `${s3path_folder_base}/${s3path_folder_date}/${s3path_folder_fileId}`;



        const temp_folder = `./statics/users/videos`;
        const processing_folder_base = temp_folder;
        const processing_folder_path = `${processing_folder_base}/${s3path_folder_date}/${s3path_folder_fileId}`;
        await this.fsMakeDirIfNotExists(`${processing_folder_path}/`)



        const fileName = originalFile.filename.replace(' ', '').trim().split('.')[0];
        //let uploaded_image = await this.minioClientService.upload(originalFile, "users", "video")



        const meta = {
            format: "mp4"
        }

        await fs.writeFile(`${processing_folder_path}/${fileName}.m3u8`,
            `#EXTM3U`
        )
        let output_dir = `${processing_folder_path}`;
        let output_name = `${fileName}`;
        let output_hls = `${fileName}.m3u8`
        let output_format = `${meta.format}`
        let s3_path = `${s3path_folder}/${fileName}.${meta.format}`;

        const video_sizes_bandwidth = {
            "320x200": 150000, // TODO : GET FROM ENV
            // "640x400": 240000, // TODO : GET FROM ENV
        }
        console.log("Dwq")
        this.newMethod(video_sizes_bandwidth, originalFile, output_dir, output_name, output_hls, output_format, s3Path_bucket, s3path_folder, processing_folder_path).then();
        const uploadedUrl = `http://localhost:9000/${s3Path_bucket}/${s3path_folder}/${fileName}.m3u8`
        // dsa
        console.log("Dwq2")
        return {
            uploadedUrl,
            originalFile,
            //: uploaded_image.minio_url,
            s3path_folder,
            processing_folder_path,
            message: "Successfully uploaded to MinIO S3"
        }
    }


    private async newMethod(video_sizes_bandwidth: { "320x200": number; }, originalFile: IMulterFile, output_dir: string, output_name: string, output_hls: string, output_format: string, s3Path_bucket: string, s3path_folder: string, processing_folder_path: string) {
        for (const size in video_sizes_bandwidth) {
            let file = await this.ffmpegVideoGenerator(originalFile.path, output_dir, output_name, output_hls, output_format, size, video_sizes_bandwidth[size]);
            let s3Address = `http://localhost:9000/${s3Path_bucket}/${s3path_folder}`;
            let hls = await this.ffmpegHlsGenerator((file as any).path, output_dir, output_name, output_hls, output_format, size, video_sizes_bandwidth[size], s3Address);
        }
        const files = fs.readdirSync(processing_folder_path);
        const uploadList = [];
        files.map(async (file) => {
            const path = `${processing_folder_path}/${file}`;
            const s3 = `${s3path_folder}/${file}`;
            const miniores = await this.minioClientService.videoUpload(s3Path_bucket, s3, path);
            console.log(miniores);
            await fs.remove(path);
            console.log('removed');
            uploadList.push(miniores);
        });
    }

    async ffmpegVideoGenerator(filePath, output_dir, output_name, output_hls, output_format = "mp4", size = '320x200', BANDWIDTH = 100) {
        return new Promise((resolve, reject) => {
            if (output_format == 'hls') output_format = 'qm3u8';
            const path = `${output_dir}/${output_name}_${size}.${output_format}`
            console.log(size)
            ffmpeg(filePath)
                .output(path, {
                    end: true
                }).format(output_format).size(size)
                .on('progress', progress => {
                    console.log('Processing: ' + progress.percent + '% done');
                })
                .on('error', err => {
                    reject(err);
                })
                .on('end', async () => {
                    console.log("PROCESSED !!");
                    resolve({ path: path })
                })
                .run();
        })
    }

    async ffmpegHlsGenerator(filePath, output_dir, output_name, output_hls, output_format = "mp4", size = '320x200', BANDWIDTH, s3Address) {
        return new Promise((resolve, reject) => {
            console.log(BANDWIDTH)
            const path = `${output_dir}/${output_name}_${size}.m3u8`;
            ffmpeg(filePath, {
                timeout: 432000
            })
                .videoBitrate(1024)
                .addOption('-hls_time', "10")
                .addOption('-hls_list_size', "0")
                .on('progress', progress => {
                    console.log('Processing: ' + progress.percent + '% done');
                })
                .on('end', async function () {
                    const orginalm3u8 = await fs.readFileSync(`${output_dir}/${output_hls}`)
                    await fs.writeFile(`${output_dir}/${output_hls}`,
                        `${orginalm3u8}
#EXT-X-STREAM-INF:BANDWIDTH=${BANDWIDTH},RESOLUTION=${size},CODECS="avc1.42e00a,mp4a.40.2"
${s3Address}/${output_name}_${size}.m3u8
`)
                    console.log('file has been converted succesfully', `_${size}` + '.m3u8');
                    resolve({ file: path })
                })
                .on('error', function (err) {

                    console.log('an error happened: ' + err.message);

                })
                .save(path)
        })
    }










    private async fsMakeDirIfNotExists(path) {
        if (!fs.existsSync(path)) fs.mkdirpSync(path);
    };
    private makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

}