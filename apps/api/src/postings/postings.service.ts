import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posting } from './posting.entity';

@Injectable()
export class PostingsService {
  constructor(
    @InjectRepository(Posting)
    private postingsRepository: Repository<Posting>,
  ) {}

  async create(posting: Partial<Posting>): Promise<Posting> {
    const newPosting = this.postingsRepository.create(posting);
    return this.postingsRepository.save(newPosting);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    filters?: { [key: string]: string },
  ): Promise<[Posting[], number]> {
    const query = this.postingsRepository.createQueryBuilder('posting');

    if (search) {
      query.andWhere(
        '(posting.title LIKE :search OR posting.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (filters) {
      Object.keys(filters).forEach((key) => {
        query.andWhere(`posting.${key} = :${key}`, { [key]: filters[key] });
      });
    }

    const [results, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [results, total];
  }

  async findOne(id: number): Promise<Posting> {
    const posting = await this.postingsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!posting) {
      throw new NotFoundException(`Posting with ID "${id}" not found`);
    }
    return posting;
  }

  async update(id: number, posting: Partial<Posting>): Promise<Posting> {
    await this.postingsRepository.update(id, posting);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Posting with ID "${id}" not found`);
    }
  }

  async deleteAll(): Promise<void> {
    await this.postingsRepository.clear();
  }
}
