import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';
import { hash } from 'bcryptjs';
import { Users } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(createUser: CreateUserDto): Promise<Users> {
        const { email, password } = createUser;
        const userExitInDb = await this.prismaService.users.findUnique({
            where: { email }
        });

        if (userExitInDb) {
            throw new HttpException("user_already_exist",
                HttpStatus.CONFLICT);
        }

        const hashPassword = await hash(password, 10);

        return await this.prismaService.users.create({
            data: {
                email,
                password: hashPassword
            }
        })

    }
}
