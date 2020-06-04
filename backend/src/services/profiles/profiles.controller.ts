import {
    Controller,
    Get, Post, Put, Delete,
    Request,
    Body, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    CacheInterceptor,
    Req,

} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { UserFromHeader, UserInHeader } from '@shared/decorators';
import { UserGuard as RoleGuard, Roles, Scopes } from '@shared/guards';
import { User, UserRoles } from '@shared/models';
import { IApi, IMulterFile } from '@shared/interfaces';

import { UsersProfileProvider } from '@services/profiles/profiles.provider';
import { UpdateUserDto } from '@services/profiles/dtos';

import { UserScopes } from '@services/authorization/models';

import * as Minio from "minio";
import { request } from 'express';
import { MinioClientService } from '@shared/minio/minio-client.service';
import { MinioService } from 'nestjs-minio-client';


@Controller(UsersProfileController.path)
@ApiTags(UsersProfileController.path)
@UseInterceptors(CacheInterceptor)
export class UsersProfileController {

    public static path = 'users';

    @Get('ping')
    @UseGuards(RoleGuard)
    @Roles(UserRoles.USER, UserRoles.GUEST)
    getPing(
        @Request() req,
        @UserFromHeader() user): any {
        return {
            authorization: req.headers.authorization,
            user,
        };
    }
    constructor(
        private readonly usersProfileProvider: UsersProfileProvider,
        private readonly minioService: MinioClientService
    ) { }

    @Roles(UserRoles.USER)
    @Scopes(UserScopes.ME)
    @UseGuards(RoleGuard)
    @Get('self')
    async getProfile(@UserFromHeader() user: UserInHeader): Promise<IApi<User>> {
        return {
            data: await this.usersProfileProvider.getProfile(user),
            message: 'user owner',
        };
    }

    @Scopes(UserScopes.ME)
    @Roles(UserRoles.USER)
    @UseGuards(RoleGuard)
    @Put('self')
    async updateProfile(
        @UserFromHeader() user: UserInHeader,
        @Body() updates: UpdateUserDto,
    ): Promise<IApi<User>> {
        return {
            data: await this.usersProfileProvider.updateProfile(user, updates),
            message: 'user owner',
        };
    }

    @Scopes(UserScopes.ME)
    @UseGuards(RoleGuard)
    @Put('self/picture')
    @UseInterceptors(FileInterceptor('file'))
    async updateProfilePicture(
        @UserFromHeader() user: UserInHeader,
        @UploadedFile() file: IMulterFile,
        @Req() request,
    ): Promise<IApi<User>> {


        const { minio_url } = await this.minioService.upload(file, "users", 'profileImages/' + user.user_id)
        return {
            data: await this.usersProfileProvider.updateProfilePicture(user, minio_url),
            message: 'user picture updated',
        };
    }
    @Scopes(UserScopes.ME)
    @UseGuards(RoleGuard)
    @Delete('self/picture')
    async deleteProfilePicture(
        @UserFromHeader() user: UserInHeader): Promise<IApi<User>> {
        return {
            data: await this.usersProfileProvider.deleteProfilePicture(user),
            message: 'user picture updated',
        };
    }

    @Get('transactions')
    async testTransaction() {
        return await this.usersProfileProvider.transactionTest();
    }
}
