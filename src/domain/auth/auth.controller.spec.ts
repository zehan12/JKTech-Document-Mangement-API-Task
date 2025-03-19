import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockRegisterUserDto: RegisterUserDto = {
        email: 'newUser@gmail.com',
        password: 'password123',
      };

      const mockResponse: any = {
        status: 'success',
        error: false,
        message: 'Registered successful',
        statusCode: 201,
        data: {
          user: {
            id: 'b901cc0b-bc65-4e9f-928a-248d532f6842',
            email: 'newUser@gmail.com',
            password: '$2b$10$0vbHSsrwxyFAMgYlGom1e.yIiYUwsV9w9BLJRYzdU/nNePnxZL/ES',
            role: 'VIEWER',
          },
        },
      };

      jest.spyOn(authService, 'register').mockResolvedValue(mockResponse);

      const result = await controller.register(mockRegisterUserDto);

      expect(result).toEqual(mockResponse);
      expect(authService.register).toHaveBeenCalledWith(mockRegisterUserDto);
    });

    it('should handle validation errors during registration', async () => {
      const mockRegisterUserDto: RegisterUserDto = {
        email: 'invalid-email',
        password: 'short',
      };

      const mockErrorResponse = {
        status: 'error',
        error: true,
        message: 'Input Validation Error',
        statusCode: 400,
        errors: {
          code: 400,
          details: 'email: Invalid email format, password: Password must be at least 6 characters long',
        },
      };

      jest.spyOn(authService, 'register').mockRejectedValue(mockErrorResponse);

      await expect(controller.register(mockRegisterUserDto)).rejects.toEqual(mockErrorResponse);
      expect(authService.register).toHaveBeenCalledWith(mockRegisterUserDto);
    });

    it('should handle duplicate user registration', async () => {
      const mockRegisterUserDto: RegisterUserDto = {
        email: 'existingUser@gmail.com',
        password: 'password123',
      };

      const mockErrorResponse = {
        status: 'error',
        error: true,
        message: 'User already exist',
        statusCode: 409,
        errors: {
          code: 409,
          details: 'user already in the database',
        },
      };

      jest.spyOn(authService, 'register').mockRejectedValue(mockErrorResponse);

      await expect(controller.register(mockRegisterUserDto)).rejects.toEqual(mockErrorResponse);
      expect(authService.register).toHaveBeenCalledWith(mockRegisterUserDto);
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      const mockLoginUserDto: LoginUserDto = {
        email: 'zehan9211@gmail.com',
        password: 'password123',
      };

      const mockResponse = {
        status: 'success',
        error: false,
        message: 'Login successful',
        statusCode: 201,
        data: {
          user: {
            id: '65b4965a-7869-4db8-a953-c5919839a48b',
            email: 'zehan9211@gmail.com',
            password: '$2b$08$BNSXrTK/PyNRO8J2eEpp0eVqhbJ/RdtqHO88x0tgF9EPqlAtcZUOq',
            role: 'ADMIN',
          },
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      };

      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      const result = await controller.login(mockLoginUserDto);

      expect(result).toEqual(mockResponse);
      expect(authService.login).toHaveBeenCalledWith(mockLoginUserDto);
    });

    it('should handle incorrect credentials during login', async () => {
      const mockLoginUserDto: LoginUserDto = {
        email: 'zehan9211@gmail.com',
        password: 'wrongPassword',
      };

      const mockErrorResponse = {
        status: 'error',
        error: true,
        message: 'Incorrect Password or email',
        statusCode: 401,
        errors: {
          code: 401,
          details: 'Invalid credentials',
        },
      };

      jest.spyOn(authService, 'login').mockRejectedValue(mockErrorResponse);

      await expect(controller.login(mockLoginUserDto)).rejects.toEqual(mockErrorResponse);
      expect(authService.login).toHaveBeenCalledWith(mockLoginUserDto);
    });

    it('should handle validation errors during login', async () => {
      const mockLoginUserDto: LoginUserDto = {
        email: 'invalid-email',
        password: '',
      };

      const mockErrorResponse = {
        status: 'error',
        error: true,
        message: 'Input Validation Error',
        statusCode: 400,
        errors: {
          code: 400,
          details: 'email: Invalid email format, password: Password is required',
        },
      };

      jest.spyOn(authService, 'login').mockRejectedValue(mockErrorResponse);

      await expect(controller.login(mockLoginUserDto)).rejects.toEqual(mockErrorResponse);
      expect(authService.login).toHaveBeenCalledWith(mockLoginUserDto);
    });
  });
});