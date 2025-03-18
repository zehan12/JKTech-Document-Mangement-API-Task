import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller({ path: "auth", version: "1" })
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async register(@Body() registerUserDto: RegisterUserDto, @Res() res) {
        const response = await this.authService.register(registerUserDto);
        res.json(
            response
        )
    }


    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res) {
        const response = await this.authService.login(loginUserDto);
        return res.json(response)
    }

}
