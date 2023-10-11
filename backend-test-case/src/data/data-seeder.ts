import { EntityManager } from '@mikro-orm/core';
import { Book } from '../books/entities/book.entity';
import { Member } from '../members/entities/member.entity';
import { booksData, membersData } from './mock-data';

export async function seedData(em: EntityManager) {
  await seedBooks(em);
  await seedMembers(em);
}

async function seedBooks(em: EntityManager) {
  const bookRepository = em.getRepository(Book);

  for (const data of booksData) {
    const existingBook = await bookRepository.findOne({ code: data.code });

    if (existingBook) {
      // Update the existing book with new data
      existingBook.title = data.title;
      existingBook.author = data.author;
      existingBook.stock = data.stock;

      await bookRepository.flush();
    } else {
      const book = bookRepository.create(data);
      await bookRepository.persist(book);
    }
  }

  await em.flush();
}

async function seedMembers(em: EntityManager) {
  const memberRepository = em.getRepository(Member);

  for (const data of membersData) {
    const existingMember = await memberRepository.findOne({ code: data.code });

    if (existingMember) {
      // Update the existing member with new data
      existingMember.name = data.name;

      await memberRepository.flush();
    } else {
      const member = memberRepository.create(data);
      await memberRepository.persist(member);
    }
  }

  await em.flush();
}
