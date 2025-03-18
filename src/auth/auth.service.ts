import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {

    }

    // async validate()

    async register(registerUser: RegisterUserDto) {
        const registeredUser = await this.userService.create(registerUser);

        registeredUser.password = "*********";
        return {
            type: 'success',
            statusCode: 200,
            user: registerUser,
        };
    }

    async login(loginUser: LoginUserDto): Promise<any> {
        const { email, password } = loginUser;
        try {

            const user = await this.prismaService.users.findUnique({
                where: { email }
            });

            if (!user) {
                throw new NotFoundException('user not found');
                // throw new HttpException('user not found', HttpStatus.NOT_FOUND);
            }

            const isPasswordVerified = await bcrypt.compare(password, user.password);

            if (!isPasswordVerified) {
                throw new NotFoundException('Incorrect Password or email');
            }

            return {
                user,
                token: this.jwtService.sign({ email })
            }

        } catch (err: unknown) {
            console.log(err, "error from error block")
            throw new InternalServerErrorException('Incorrect Password or email');
        }

    }
}
