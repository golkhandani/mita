import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { MongooseModule } from '@nestjs/mongoose';

import { User, userSchemaOptions } from '@shared/models/users.model';
import { UsersProfileController } from './profiles.controller';
import { UsersProfileProvider } from './profiles.provider';
import { redisConstants } from '@constants/index';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { multerStorageMaker } from '@shared/helpers';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificatonModule } from '@services/notification/notification.module';
import { UserRepository } from './repositories/user.repository';
import * as multer from 'multer';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientModule } from '@shared/minio/minio-client.module';
export const tempfolder: string = `./statics/users/pictures`;
export const storage = multerStorageMaker(tempfolder);
export const multerOptions: MulterModuleOptions = {
    storage: multer.memoryStorage()
};
@Module({
    imports: [
        MinioClientModule,
        MinioModule.register({
            endPoint: 'localhost',
            port: 9000,
            useSSL: false,
            accessKey: 'minio-access-key',
            secretKey: 'minio-secret-key'
        }),
        NotificatonModule,
        MulterModule.register(multerOptions),
        // TODO: send redis uri to env
        CacheModule.register({
            store: redisStore,
            ...redisConstants,
        }),
        TypegooseModule.forFeature([{
            typegooseClass: User,
            schemaOptions: userSchemaOptions,
        }]),
    ],
    controllers: [
        UsersProfileController,
    ],
    providers: [
        UsersProfileProvider,
        UserRepository,
    ],
    exports: [
        UsersProfileProvider,
        UserRepository,
    ],
})
export class UsersProfileModule { }
