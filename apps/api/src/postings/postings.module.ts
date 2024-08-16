import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posting } from './posting.entity';
import { PostingsService } from './postings.service';
import { PostingsController } from './postings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  providers: [PostingsService],
  controllers: [PostingsController],
  exports: [PostingsService],
})
export class PostingsModule {}
