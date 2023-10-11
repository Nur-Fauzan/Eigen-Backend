import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
  ) {}

  async bookCheck(): Promise<any[]> {
    const books = await this.bookRepository.findAll();

    return books.map((book) => ({
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.stock,
    }));
  }
}
