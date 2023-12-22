import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from './collections.controller';
import { PrismaModule } from '../prisma/prisma.module';

describe('CollectionsController', () => {
  let controller: CollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CollectionsController],
    }).compile();

    controller = module.get<CollectionsController>(CollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
