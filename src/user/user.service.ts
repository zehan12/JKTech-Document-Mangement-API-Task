import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { hash } from 'bcryptjs';
import { Users } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(createUser: CreateUserDto): Promise<Users> {
        try {
            const { email, password } = createUser;
            const userExitInDb = await this.prismaService.users.findUnique({
                where: { email }
            });

            if (userExitInDb) {
                throw new HttpException("user_already_exist",
                    HttpStatus.CONFLICT);
            }

            const hashPassword = await hash(password, 10);

            const user = await this.prismaService.users.create({
                data: {
                    email,
                    password: hashPassword
                }
            })

            return user;
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

    async getCurrentUser(email: string) {
        try {

            const user = await this.prismaService.users.findUnique({
                where: { email: "asll" },
                select: { id: true, email: true, role: true }
            })

            if (!user) {
                throw new NotFoundException({
                    message: 'User not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'Invalid email or user does not exist' }
                });
            }

            return {
                message: "Fetched user successful",
                statusCode: HttpStatus.OK,
                data: {
                    user,
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
