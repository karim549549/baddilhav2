import { Controller, Post, Delete, Param, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BlobService } from './blob.service';
import { UploadResult, MulterFile } from '../types/blob.types';
import { BLOB_ERROR_MESSAGES } from '../libs/constants/blob.constants';
import { BlobUploadEndpoint, BlobDeleteEndpoint } from '../common/decorators/blob-endpoint.decorator';

@ApiTags('Blob Storage')
@Controller('blob')
@ApiBearerAuth()
export class BlobController {
  constructor(private readonly blobService: BlobService) {}

  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @BlobUploadEndpoint(
    'Upload user avatar',
    'Upload a user avatar image'
  )
  async uploadAvatar(
    @UploadedFile() file: MulterFile,
    @Body('userId') userId: string
  ): Promise<UploadResult> {
    if (!file) {
      throw new Error(BLOB_ERROR_MESSAGES.NO_FILE_PROVIDED);
    }
    return this.blobService.uploadUserAvatar(userId, file);
  }

  @Post('upload/item-photo')
  @UseInterceptors(FileInterceptor('file'))
  @BlobUploadEndpoint(
    'Upload item photo',
    'Upload a photo for an item'
  )
  async uploadItemPhoto(
    @UploadedFile() file: MulterFile,
    @Body('itemId') itemId: string,
    @Body('photoIndex') photoIndex?: number
  ): Promise<UploadResult> {
    if (!file) {
      throw new Error(BLOB_ERROR_MESSAGES.NO_FILE_PROVIDED);
    }
    return this.blobService.uploadItemPhoto(itemId, file, photoIndex || 0);
  }

  @Post('upload/verification')
  @UseInterceptors(FileInterceptor('file'))
  @BlobUploadEndpoint(
    'Upload verification document',
    'Upload a verification document for user verification'
  )
  async uploadVerificationDocument(
    @UploadedFile() file: MulterFile,
    @Body('userId') userId: string,
    @Body('documentType') documentType: string
  ): Promise<UploadResult> {
    if (!file) {
      throw new Error(BLOB_ERROR_MESSAGES.NO_FILE_PROVIDED);
    }
    return this.blobService.uploadVerificationDocument(userId, file, documentType);
  }

  @Post('upload/chat-attachment')
  @UseInterceptors(FileInterceptor('file'))
  @BlobUploadEndpoint(
    'Upload chat attachment',
    'Upload a file attachment for chat messages'
  )
  async uploadChatAttachment(
    @UploadedFile() file: MulterFile,
    @Body('chatId') chatId: string
  ): Promise<UploadResult> {
    if (!file) {
      throw new Error(BLOB_ERROR_MESSAGES.NO_FILE_PROVIDED);
    }
    return this.blobService.uploadChatAttachment(chatId, file);
  }

  @Delete(':path')
  @BlobDeleteEndpoint(
    'Delete file',
    'Delete a file from storage by its path'
  )
  async deleteFile(@Param('path') path: string): Promise<void> {
    return this.blobService.deleteFile(path);
  }
}
