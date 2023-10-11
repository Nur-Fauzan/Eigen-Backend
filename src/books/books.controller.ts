import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookCheckDto, MemberCheckDto } from './book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get('/book-check')
  async bookCheck() {
    return this.bookService.bookCheck();
  }
}