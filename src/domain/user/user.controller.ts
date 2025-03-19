import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: "user", version: "1" })
export class UserController {
    constructor(private userService: UserService) { }

    @Get("me")
    @UseGuards(AuthGuard('jwt'))
    async getCurrentUser(@Request() req) {
        return await this.userService.getCurrentUser(req.user.email);
    }
}
