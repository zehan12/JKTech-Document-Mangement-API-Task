import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller({ path: "auth", version: "1" })
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: "Used to register user into system" })
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: 'Registered successful' })
    @ApiConflictResponse({description:'User already exists'})
    @ApiBadRequestResponse({ description: 'Input validation error' })
    @Post('/register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }


    @ApiOperation({ summary: "Used to login user into system" })
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: 'Login successful' })
    @ApiUnprocessableEntityResponse({description:'Incorrect Password or email'})
    @ApiBadRequestResponse({ description: 'Input validation error' })
    
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

}
