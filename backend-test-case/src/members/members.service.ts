import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Member } from './entities/member.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: EntityRepository<Member>,
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
    private readonly em: EntityManager,
  ) {}

  async generateMemberCode(): Promise<string> {
    const lastMember = await this.em.findOne(Member, {}, { orderBy: { code: 'DESC' } });

    if (!lastMember) {
      return 'M001';
    }

    const lastCode = lastMember.code;
    const numericPart = parseInt(lastCode.slice(1), 10);
    const nextCode = `M${(numericPart + 1).toString().padStart(3, '0')}`;

    return nextCode;
  }
  async borrowBook(memberCode: string, bookCode: string): Promise<string> {
    
    const member = await this.memberRepository.findOne({ code: memberCode });
    
    const book = await this.bookRepository.findOne({ code: bookCode });
  
    if (!member || !book) {
      return memberCode;
    }
  
    if (member.borrowedBooks.length >= 2 || book.stock <= 0 || member.penaltyEndDate) {
      return "Borrowing not allowed";
    }
  
    // Update member's borrowedBooks and decrease book stock
    member.borrowedBooks.push(bookCode); // Add the book code (a string) to the array
    book.stock--;
  
    // Persist changes to the database
    await this.em.flush();
  
    return "Borrow successful";
  }
  async returnBook(memberCode: string, bookCode: string): Promise<string> {
    // Find the member and book
    const member = await this.memberRepository.findOne({ code: memberCode });
    const book = await this.bookRepository.findOne({ code: bookCode });
  
    if (!member || !book) {
      return "Member or book not found";
    }
  
    if (!member.borrowedBooks.includes(bookCode)) {
      return "Book not borrowed by the member";
    }
  
    // Check if the return is late (calculate the days late as needed)
    const currentDate = new Date().getTime();
    const currentDateTime = new Date(currentDate);
    const returnDate = new Date().getTime(); // Set to the actual return date
    const daysLate = Math.floor((currentDate - returnDate) / (1000 * 60 * 60 * 24));
  
    if (daysLate > 7) {
      // Apply a penalty (update member's penaltyEndDate)
      const penaltyEndDate = new Date(currentDate);
      penaltyEndDate.setDate(currentDateTime.getDate() + 3); // Penalty lasts for 3 days
      member.penaltyEndDate = penaltyEndDate.toISOString();
    }
  
    // Update member's borrowedBooks and increase book stock
    member.borrowedBooks = member.borrowedBooks.filter((code) => code !== bookCode);
    book.stock++;
  
    // Persist changes to the database
    await this.em.flush();
  
    return "Return successful";
  }
  async memberCheck(): Promise<any[]> {
    const members = await this.memberRepository.findAll();

    return members.map((member) => ({
      code: member.code,
      name: member.name,
      borrowedBooks: member.borrowedBooks.length,
    }));
  }     
}