import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Posting } from './postings/posting.entity';
import { PostingsModule } from './postings/postings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Posting],
      synchronize: true, // Set to false in production
    }),
    PostingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
