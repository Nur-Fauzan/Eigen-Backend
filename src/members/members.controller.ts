import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MembersService } from './members.service';
import { BorrowBookDto, ReturnBookDto } from './member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @Post('borrow/:memberCode/:bookCode')
  async borrowBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const result = await this.memberService.borrowBook(memberCode, bookCode);
    return { message: result };
  }

  @Post('return/:memberCode/:bookCode')
  async returnBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
  ) {
    const result = await this.memberService.returnBook(memberCode, bookCode);
    return { message: result };
  }
  
  @Get('/member-check')
  async memberCheck() {
    return this.memberService.memberCheck();
  }
}