import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
export const config = {
    MINIO_ENDPOINT: 'localhost',
    MINIO_PORT: 9000,
    useSSL: false,
    MINIO_ACCESSKEY: 'minio-access-key',
    MINIO_SECRETKEY: 'minio-secret-key',
    MINIO_BUCKET: 'test'
}

@Module({
    imports: [
        MinioModule.register({
            endPoint: config.MINIO_ENDPOINT,
            port: config.MINIO_PORT,
            useSSL: false,
            accessKey: config.MINIO_ACCESSKEY,
            secretKey: config.MINIO_SECRETKEY,
        })
    ],
    providers: [MinioClientService],
    exports: [MinioClientService]
})
export class MinioClientModule { }
