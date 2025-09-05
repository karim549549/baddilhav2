import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlobService } from './blob.service';
import { BlobController } from './blob.controller';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [BlobController],
  providers: [BlobService],
  exports: [BlobService],
})
export class BlobModule {}
