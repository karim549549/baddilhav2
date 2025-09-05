export interface UploadResult {
  path: string;
  fullUrl: string;
  bucket: string;
  size: number;
  contentType: string;
}

export interface BlobConfig {
  supabaseUrl: string;
  supabaseServiceKey: string;
  defaultBucket: string;
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
}

export interface FileUploadRequest {
  file: MulterFile;
  userId?: string;
  itemId?: string;
  chatId?: string;
  documentType?: string;
  photoIndex?: number;
}
