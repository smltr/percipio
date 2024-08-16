import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { PostingsService } from './src/postings/postings.service';
import { Posting } from './src/postings/posting.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postingsService = app.get(PostingsService);

  await postingsService.deleteAll();
  console.log('All postings have been erased!');

  const postings: Partial<Posting>[] = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Co.',
      description: 'Work on a range of development projects.',
      jobType: 'Full Stack',
      salaryFrom: 70000,
      salaryTo: 90000,
      postedDate: new Date().toISOString(),
    },
    {
      title: 'Front End Developer',
      company: 'Web Innovators',
      description: 'Focus on creating beautiful and responsive web interfaces.',
      jobType: 'Front End',
      salaryFrom: 60000,
      salaryTo: 80000,
      postedDate: new Date().toISOString(),
    },
    {
      title: 'Back End Developer',
      company: 'Data Systems',
      description: 'Develop robust back-end processes and APIs.',
      jobType: 'Back End',
      salaryFrom: 65000,
      salaryTo: 85000,
      postedDate: new Date().toISOString(),
    },
  ];

  for (const posting of postings) {
    await postingsService.create(posting);
  }

  console.log('3 postings have been added!');
  await app.close();
}

seed();
