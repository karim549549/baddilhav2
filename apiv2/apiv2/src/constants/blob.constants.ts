export const BLOB_CONFIG = {
  // Environment variable keys
  SUPABASE_URL_KEY: 'SUPABASE_URL',
  SUPABASE_SERVICE_ROLE_KEY: 'SUPABASE_SERVICE_ROLE_KEY',
  SUPABASE_BUCKET_NAME_KEY: 'SUPABASE_BUCKET_NAME',
  
  // Default values
  DEFAULT_BUCKET_NAME: 'baddilha-assets',
  
  // Cache settings
  CACHE_CONTROL: '3600',
  
  // File upload settings
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'] as string[],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime'] as string[],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] as string[],
} as const;

export const BLOB_ERROR_MESSAGES = {
  UPLOAD_FAILED: 'Failed to upload file',
  DELETE_FAILED: 'Failed to delete file',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
  NO_FILE_PROVIDED: 'No file provided',
} as const;
