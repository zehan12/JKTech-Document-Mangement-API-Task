import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../providers/prisma';
import { InternalServerErrorException, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_jwt_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockRegisterUserDto = { email: 'test@example.com', password: 'securepassword' };
      const mockUser: any = { id: '1', email: 'test@example.com', password: 'hashedPassword' };

      jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

      const result = await authService.register(mockRegisterUserDto);

      expect(result).toEqual({
        message: 'Registered successful',
        statusCode: 201,
        data: { user: mockUser },
      });
    });

    it('should throw a conflict error if user already exists', async () => {
      const mockRegisterUserDto = { email: 'existing@example.com', password: 'password123' };

      jest.spyOn(userService, 'create').mockRejectedValue(
        new ConflictException({
          message: 'User already exist',
          statusCode: 409,
          error: { code: 409, details: 'user already in the database' },
        })
      );

      await expect(authService.register(mockRegisterUserDto)).rejects.toThrow(ConflictException);
    });

    it('should handle unexpected errors', async () => {
      const mockRegisterUserDto = { email: 'error@example.com', password: 'password123' };

      jest.spyOn(userService, 'create').mockRejectedValue(new Error('Database failure'));

      await expect(authService.register(mockRegisterUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('login', () => {
    it('should return a valid token for correct credentials', async () => {
      const mockLoginUserDto = { email: 'user@example.com', password: 'correctPassword' };
      const mockUser: any = { id: '1', email: 'user@example.com', password: await bcrypt.hash('correctPassword', 10) };

      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(mockUser);
      //@ts-ignore
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.login(mockLoginUserDto);

      expect(result).toEqual({
        message: 'Login successful',
        statusCode: 200,
        data: {
          user: mockUser,
          access_token: 'mocked_jwt_token',
        },
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const mockLoginUserDto = { email: 'nonexistent@example.com', password: 'somePassword' };

      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(null);

      await expect(authService.login(mockLoginUserDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockLoginUserDto = { email: 'user@example.com', password: 'wrongPassword' };
      const mockUser: any = { id: '1', email: 'user@example.com', password: await bcrypt.hash('correctPassword', 10) };

      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(mockUser);
      //@ts-ignore
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(authService.login(mockLoginUserDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should handle unexpected errors in login', async () => {
      const mockLoginUserDto = { email: 'error@example.com', password: 'password123' };

      jest.spyOn(prismaService.users, 'findUnique').mockRejectedValue(new Error('Database error'));

      await expect(authService.login(mockLoginUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
