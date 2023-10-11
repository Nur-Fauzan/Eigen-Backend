import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Book } from './entities/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Book], // Register the Book entity
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService], // Include BooksService in the providers
})
export class BooksModule {}
