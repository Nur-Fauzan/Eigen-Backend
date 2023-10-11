import { Migration } from '@mikro-orm/migrations';

export class Migration20231010173113 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" serial primary key, "code" varchar(255) not null, "title" varchar(255) not null, "author" varchar(255) not null, "stock" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "book" add constraint "book_code_unique" unique ("code");');

    this.addSql('create table "member" ("id" serial primary key, "code" varchar(255) not null, "name" varchar(255) not null, "penalty_end_date" varchar(255) null default null, "borrowed_books" text[] not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "member" add constraint "member_code_unique" unique ("code");');
  }

}
