import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { seedData } from './data-seeder'; // Import the data seeding utility

@Injectable()
export class DataService {
  constructor(private readonly em: EntityManager) {}

  async seedData() {
    await seedData(this.em); // Use the data seeding utility
  }
}
