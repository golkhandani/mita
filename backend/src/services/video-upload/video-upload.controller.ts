import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { VideoUploadService } from './video-upload.service';
import { IMulterFile } from '@shared/interfaces';

@Controller('video-upload')
export class VideoUploadController {
    constructor(
        private videoUploadService: VideoUploadService
    ) { }

    @Post('single')
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingle(
        @UploadedFile() video: IMulterFile
    ) {
        return await this.videoUploadService.uploadSingle(video)
    }
}