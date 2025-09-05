import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UploadResult, BlobConfig, MulterFile } from '../types/blob.types';
import { BLOB_CONFIG, BLOB_ERROR_MESSAGES } from '../libs/constants/blob.constants';

@Injectable()
export class BlobService {
  private supabase: SupabaseClient;
  private config: BlobConfig;

  constructor(private configService: ConfigService) {
    this.config = {
      supabaseUrl: this.configService.get<string>(BLOB_CONFIG.SUPABASE_URL_KEY)!,
      supabaseServiceKey: this.configService.get<string>(BLOB_CONFIG.SUPABASE_SERVICE_ROLE_KEY)!,
      defaultBucket: this.configService.get<string>(BLOB_CONFIG.SUPABASE_BUCKET_NAME_KEY, BLOB_CONFIG.DEFAULT_BUCKET_NAME),
    };

    this.supabase = createClient(this.config.supabaseUrl, this.config.supabaseServiceKey);
  }

  /**
   * Upload a file to the specified bucket and folder
   */
  async uploadFile(
    file: MulterFile,
    fileName: string,
    bucket: string = this.config.defaultBucket,
    folder: string = 'general'
  ): Promise<UploadResult> {
    // Validate file
    this.validateFile(file);
    
    const filePath = this.generateFilePath(folder, fileName);
    const fileBuffer = Buffer.from(file.buffer);
    
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        cacheControl: BLOB_CONFIG.CACHE_CONTROL,
        upsert: false
      });

    if (error) {
      throw new BadRequestException(`${BLOB_ERROR_MESSAGES.UPLOAD_FAILED}: ${error.message}`);
    }

    const { data: publicUrl } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      fullUrl: publicUrl.publicUrl,
      bucket,
      size: file.size,
      contentType: file.mimetype,
    };
  }

  /**
   * Delete a file from storage
   */
  async deleteFile(filePath: string, bucket: string = this.config.defaultBucket): Promise<void> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw new NotFoundException(`${BLOB_ERROR_MESSAGES.DELETE_FAILED}: ${error.message}`);
    }
  }

  /**
   * Get public URL for a file
   */
  getPublicUrl(filePath: string, bucket: string = this.config.defaultBucket): string {
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }

  /**
   * Generate organized file path based on folder structure
   */
  private generateFilePath(folder: string, fileName: string): string {
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const sanitizedFileName = this.sanitizeFileName(fileName);
    return `${folder}/${timestamp}/${sanitizedFileName}`;
  }

  /**
   * Sanitize file name to prevent path traversal and special characters
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase();
  }

  /**
   * Upload user avatar
   */
  async uploadUserAvatar(userId: string, file: MulterFile): Promise<UploadResult> {
    const fileName = `avatar_${userId}_${Date.now()}.${this.getFileExtension(file)}`;
    return this.uploadFile(file, fileName, this.config.defaultBucket, 'users/avatars');
  }

  /**
   * Upload item photo
   */
  async uploadItemPhoto(itemId: string, file: MulterFile, photoIndex: number = 0): Promise<UploadResult> {
    const fileName = `item_${itemId}_${photoIndex}_${Date.now()}.${this.getFileExtension(file)}`;
    return this.uploadFile(file, fileName, this.config.defaultBucket, 'items/photos');
  }

  /**
   * Upload verification document
   */
  async uploadVerificationDocument(userId: string, file: MulterFile, documentType: string): Promise<UploadResult> {
    const fileName = `verification_${userId}_${documentType}_${Date.now()}.${this.getFileExtension(file)}`;
    return this.uploadFile(file, fileName, this.config.defaultBucket, 'users/verification');
  }

  /**
   * Upload chat attachment
   */
  async uploadChatAttachment(chatId: string, file: MulterFile): Promise<UploadResult> {
    const fileName = `chat_${chatId}_${Date.now()}.${this.getFileExtension(file)}`;
    return this.uploadFile(file, fileName, this.config.defaultBucket, 'chat/attachments');
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: MulterFile): void {
    if (!file) {
      throw new BadRequestException(BLOB_ERROR_MESSAGES.NO_FILE_PROVIDED);
    }

    if (file.size > BLOB_CONFIG.MAX_FILE_SIZE) {
      throw new BadRequestException(BLOB_ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    const allowedTypes = [
      ...BLOB_CONFIG.ALLOWED_IMAGE_TYPES,
      ...BLOB_CONFIG.ALLOWED_VIDEO_TYPES,
      ...BLOB_CONFIG.ALLOWED_DOCUMENT_TYPES,
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(BLOB_ERROR_MESSAGES.INVALID_FILE_TYPE);
    }
  }

  /**
   * Get file extension from file
   */
  private getFileExtension(file: MulterFile): string {
    const extension = file.originalname.split('.').pop();
    if (!extension) {
      // Fallback: try to get extension from mimetype
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
        'image/svg+xml': 'svg',
        'video/mp4': 'mp4',
        'video/quicktime': 'mov',
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      };
      return mimeToExt[file.mimetype] || 'bin';
    }
    return extension.toLowerCase();
  }
}
