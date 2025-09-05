# BADDILHA Blob Storage System

## Overview
The BADDILHA blob storage system provides a centralized, organized way to handle file uploads using Supabase Storage buckets. It's designed to be secure, scalable, and well-organized.

## Architecture

### Global Service
- **BlobModule**: Global module that provides `BlobService` throughout the application
- **BlobService**: Core service handling all file operations
- **BlobController**: REST API endpoints for file operations

### Supabase Integration
- Uses Supabase Storage buckets for file storage
- Service role key for server-side operations
- Public URLs for client access

## Folder Structure

The blob storage follows a hierarchical folder structure for organization:

```
baddilha-assets/
├── users/
│   ├── avatars/
│   │   └── 2024-01-01/
│   │       └── avatar_user123_1234567890.jpg
│   └── verification/
│       └── 2024-01-01/
│           └── verification_user123_id_1234567890.pdf
├── items/
│   └── photos/
│       └── 2024-01-01/
│           └── item_item123_0_1234567890.jpg
├── chat/
│   └── attachments/
│       └── 2024-01-01/
│           └── chat_chat123_1234567890.jpg
└── general/
    └── 2024-01-01/
        └── general_file_1234567890.pdf
```

## File Naming Convention

### Pattern: `{type}_{id}_{index}_{timestamp}.{extension}`

- **User Avatars**: `avatar_{userId}_{timestamp}.{ext}`
- **Item Photos**: `item_{itemId}_{photoIndex}_{timestamp}.{ext}`
- **Verification Docs**: `verification_{userId}_{documentType}_{timestamp}.{ext}`
- **Chat Attachments**: `chat_{chatId}_{timestamp}.{ext}`

## Environment Variables

Add these to your `.env` file:

```env
# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
SUPABASE_BUCKET_NAME="baddilha-assets"
```

## API Endpoints

### Upload User Avatar
```http
POST /blob/upload/avatar
Content-Type: multipart/form-data

Body:
- file: [image file]
- userId: string
```

### Upload Item Photo
```http
POST /blob/upload/item-photo
Content-Type: multipart/form-data

Body:
- file: [image file]
- itemId: string
- photoIndex?: number (default: 0)
```

### Upload Verification Document
```http
POST /blob/upload/verification
Content-Type: multipart/form-data

Body:
- file: [document file]
- userId: string
- documentType: string
```

### Upload Chat Attachment
```http
POST /blob/upload/chat-attachment
Content-Type: multipart/form-data

Body:
- file: [any file]
- chatId: string
```

### Delete File
```http
DELETE /blob/{filePath}
```

## Usage in Services

### Inject BlobService
```typescript
import { BlobService } from '../blob/blob.service';

@Injectable()
export class UserService {
  constructor(private readonly blobService: BlobService) {}

  async updateUserAvatar(userId: string, file: Buffer) {
    const uploadResult = await this.blobService.uploadUserAvatar(userId, file);
    
    // Update user record with new avatar URL
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: uploadResult.fullUrl }
    });
    
    return uploadResult;
  }
}
```

## Security Features

### File Sanitization
- Automatic file name sanitization
- Prevention of path traversal attacks
- Content type validation

### Access Control
- Service role key for server-side operations
- Public URLs for client access
- No direct client access to storage

### File Validation
- Content type detection
- File size limits (configurable)
- Extension validation

## Supported File Types

### Images
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

### Videos
- MP4 (.mp4)
- MOV (.mov)

### Documents
- PDF (.pdf)
- Word (.doc, .docx)

## Error Handling

The service provides comprehensive error handling:

- **BadRequestException**: Invalid file or upload failure
- **NotFoundException**: File not found during deletion
- **Validation Errors**: Invalid file types or sizes

## Performance Considerations

### Caching
- Files are cached with 1-hour cache control
- Public URLs are generated on-demand

### Organization
- Files are organized by date for easy cleanup
- Hierarchical structure for efficient browsing

### Scalability
- Supabase Storage handles scaling automatically
- CDN integration for global access

## Best Practices

### File Upload
1. Always validate file types on the client
2. Implement file size limits
3. Use appropriate folder structure
4. Generate unique file names

### File Management
1. Clean up old files periodically
2. Use appropriate content types
3. Implement proper error handling
4. Monitor storage usage

### Security
1. Never expose service role keys
2. Validate all file uploads
3. Use HTTPS for all operations
4. Implement proper access controls

## Integration with Prisma Schema

Update your Prisma schema to include file URLs:

```prisma
model User {
  id       String @id @default(cuid())
  avatar   String? // URL from blob storage
  // ... other fields
}

model Item {
  id     String @id @default(cuid())
  photos String[] // Array of URLs from blob storage
  // ... other fields
}
```

## Monitoring and Maintenance

### Storage Monitoring
- Monitor bucket usage
- Set up alerts for storage limits
- Regular cleanup of old files

### Performance Monitoring
- Track upload/download times
- Monitor error rates
- Optimize based on usage patterns

## Future Enhancements

### Planned Features
- Image resizing and optimization
- Video thumbnail generation
- File compression
- Advanced access controls
- Backup and replication

### Integration Opportunities
- CDN integration
- Image processing pipeline
- AI-powered content moderation
- Advanced analytics
