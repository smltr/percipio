import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PostingsService } from './postings.service';
import { Posting } from './posting.entity';

@Controller('postings')
export class PostingsController {
  constructor(private readonly postingsService: PostingsService) {}

  @Post()
  create(@Body() posting: Partial<Posting>): Promise<Posting> {
    return this.postingsService.create(posting);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('filters') filters?: string,
  ) {
    const parsedFilters = filters ? JSON.parse(filters) : undefined;
    const [results, total] = await this.postingsService.findAll(
      page,
      limit,
      search,
      parsedFilters,
    );
    return {
      results,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posting> {
    return this.postingsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() posting: Partial<Posting>,
  ): Promise<Posting> {
    return this.postingsService.update(+id, posting);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postingsService.remove(+id);
  }
}
