import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Member } from './members/entities/member.entity';
import { Book } from './books/entities/book.entity';
import { MembersController } from './members/members.controller';
import { BooksController } from './books/books.controller';
import { MembersService } from './members/members.service';
import { BooksService } from './books/books.service';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import mikroOrmConfig from './mikro-orm.config'; 
import { DataService } from './data/data.service';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    MembersModule, BooksModule, HttpModule,
    MikroOrmModule.forFeature({ entities: [Member, Book] })],
  controllers: [MembersController, BooksController],
  providers: [ MembersService, BooksService, DataService],
})
export class AppModule {}
