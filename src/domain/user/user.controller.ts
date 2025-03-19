import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard, RolesGuard } from '@core/guards';
import { Roles } from '@core/decorators';

@Controller({ path: "user", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get("")
    @Roles("ADMIN")
    async getAllUsers(){
        return await this.userService.getAllUsers();
    }

    @Get("me")
    async getCurrentUser(@Request() req) {
        return await this.userService.getCurrentUser(req.user.email);
    }

    @Patch('/:id/role')
    @Roles('Admin')
    async updateUserRole(@Param('id') userId: string, @Body('role') newRole: string) {
        // return await this.userService.updateUserRole(userId, newRole);
    }
}

