import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { PrismaService } from '../../providers/prisma';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async register(registerUser: RegisterUserDto) {
        try {

            const registeredUser = await this.userService.create(registerUser);

            return {
                message: "Registered successful",
                statusCode: HttpStatus.CREATED,
                data: {
                    user: registeredUser,
                }
            };
        } catch (err) {

            if (err instanceof HttpException) {
                throw err;
            }

            throw new InternalServerErrorException({
                message: 'Something went wrong',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: { code: HttpStatus.INTERNAL_SERVER_ERROR, details: err.message || 'Unexpected error occurred' }
            });
        }
    }

    async login(loginUser: LoginUserDto): Promise<any> {
        const { email, password } = loginUser;
        try {
            const user = await this.prismaService.users.findUnique({
                where: { email }
            });

            if (!user) {
                throw new NotFoundException({
                    message: 'User not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'Invalid email or user does not exist' }
                });
            }

            const isPasswordVerified = await bcrypt.compare(password, user.password);
            if (!isPasswordVerified) {
                throw new UnauthorizedException({
                    message: 'Incorrect Password or email',
                    statusCode: HttpStatus.UNAUTHORIZED,
                    error: { code: HttpStatus.UNAUTHORIZED, details: 'Invalid credentials' }
                });
            }

            return {
                message: "Login successful",
                statusCode: HttpStatus.OK,
                data: {
                    user,
                    access_token: this.jwtService.sign({ email })
                }
            };

        } catch (err) {

            if (err instanceof HttpException) {
                throw err;
            }

            throw new InternalServerErrorException({
                message: 'Something went wrong',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: { code: HttpStatus.INTERNAL_SERVER_ERROR, details: err.message || 'Unexpected error occurred' }
            });
        }
    }


}
