import { Module } from '@nestjs/common';


import * as multer from 'multer';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { VideoUploadController } from './video-upload.controller';
import { VideoUploadService } from './video-upload.service';
import * as fs from 'fs-extra';
import { MinioClientModule } from '@shared/minio/minio-client.module';


export async function fsMakeDirIfNotExists(path) {
    if (!fs.existsSync(path)) { fs.mkdirpSync(path); }
}
export async function fsRemoveFileIfExists(path: string) {
    if (fs.existsSync(path)) {
        fs.removeSync(path);
    }
}


export const multerStorageMaker = (folder: string) => {
    return multer.diskStorage({
        destination: async (req, file, cb) => {
            await fsMakeDirIfNotExists(folder);
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '__' + file.originalname);
        },
    });
};
export const tempfolder: string = `./statics/users/videos`;

export const storage = multerStorageMaker(tempfolder);

export const multerOptions: MulterModuleOptions = {
    storage
};
@Module({
    imports: [
        MinioClientModule,
        MulterModule.register(multerOptions),
    ],
    controllers: [
        VideoUploadController
    ],
    providers: [
        VideoUploadService
    ],
    exports: [

    ],
})
export class VideoUploadModule { }
