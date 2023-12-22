import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Assure-toi d'ajuster le chemin en fonction de ta structure

describe('HomeController', () => {
  let controller: HomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [HomeController],
    }).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
