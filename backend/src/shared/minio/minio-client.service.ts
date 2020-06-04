import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { IMulterFile } from '@shared/interfaces';

@Injectable()
export class MinioClientService {
    constructor(
        private readonly minio: MinioService,
    ) {
    }
    public async upload(file: IMulterFile, bucket = "test", basePath) {
        const path = basePath + '/' + file.originalname;
        const etag = await this.minio.client.putObject(bucket, path, file.buffer)
        return {
            minio_url: `http://localhost:9000/${bucket}/${path}`,
            etag
        };
    }
    public async videoUpload(s3Path_bucket, s3_path, file_path) {
        return new Promise((resolve, reject) => {
            const metaData = {
                'Content-Type': 'application/octet-stream',
            };
            const miniores = this.minio.client.fPutObject(s3Path_bucket, s3_path, file_path, metaData, function (err, etag) {
                if (err) return reject({ err: err, data: null })
                console.log('File uploaded successfully. etag :' + etag)
                resolve({ err: null, data: etag });
            });
        })
    }


}
