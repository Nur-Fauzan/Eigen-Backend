import { EntityRepository, Entity } from '@mikro-orm/core';
import { Member } from './entities/member.entity';

@Entity({ customRepository: () => Member })
export class MemberRepository extends EntityRepository<Member> {}
