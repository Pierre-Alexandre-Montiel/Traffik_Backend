import { Test, TestingModule } from '@nestjs/testing';
import { OauthController } from './auth.controller';
import { OauthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('OauthController', () => {
  let controller: OauthController;
  let authService: OauthService; // Assure-toi de déclarer authService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OauthController],
      providers: [OauthService, PrismaService],
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.SECRET_JWT,
          signOptions: { expiresIn: '60s' },
        }),
      ],
    }).compile();

    controller = module.get<OauthController>(OauthController);
    authService = module.get<OauthService>(OauthService); // Assure-toi d'initialiser authService
  });

  describe('createUser', () => {
    it('should create a user and return a response object', async () => {
      // Mocking the authService.createUser method to simulate a successful user creation
      const mockUserData = {
        email: 'eetiewnenne@gmail.com',
        password:
          '$2b$10$z70xI2J./8zARhvtCnIZtunrNIW5sbcZWxv2WMGBZ4VWvZ5QSLDLq',
        // Ajoute d'autres propriétés si nécessaire
      };
      jest.spyOn(authService, 'createUser').mockResolvedValue(mockUserData);

      const result = await controller.createUser({
        email: 'eetiewnenne@gmail.com',
        password:
          '$2b$10$z70xI2J./8zARhvtCnIZtunrNIW5sbcZWxv2WMGBZ4VWvZ5QSLDLq',
      });

      expect(result).toEqual({ code: 200, user: mockUserData });
    });

    it('should handle user creation failures and return a response object with code 500', async () => {
      // Mocking the authService.createUser method to simulate a failed user creation
      jest
        .spyOn(authService, 'createUser')
        .mockRejectedValue(new Error('User creation failed'));

      const result = await controller.createUser({
        email: 'invalid@example.com',
        password: 'invalidPassword',
      });

      expect(result).toEqual({ code: 500 });
    });
  });

  // Add similar describe blocks for login and getProfile methods
  // ...
});
