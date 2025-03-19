import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard, RolesGuard } from '@core/guards';
import { Roles } from '@core/decorators';
import { ROLE } from '@core/enums';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller({ path: "user", version: "1" })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @Get("")
    @Roles(ROLE.ADMIN)
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    @ApiOkResponse({ description: 'Fetched all users successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized - JWT required' })
    @ApiForbiddenResponse({ description: 'Forbidden - Only Admin can access' })
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get("me")
    @ApiOperation({ summary: "Get current user" })
    @ApiOkResponse({ description: 'Fetched user successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized - JWT required' })  
    async getCurrentUser(@Request() req) {
        return await this.userService.getCurrentUser(req.user.email);
    }

    @Patch('/:id/role')
    @Roles(ROLE.ADMIN)
    @ApiOperation({ summary: "Update user role (Admin only)" })
    @ApiOkResponse({ description: 'User role updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid role' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized - JWT required' })
    @ApiForbiddenResponse({ description: 'Forbidden - Only Admin can update roles' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiUnprocessableEntityResponse({ description: 'Incorrect role or user data' })
    async updateUserRole(@Param('id') userId: string, @Body('role') newRole: string) {
        return this.userService.updateUserRole(userId, newRole);
    }
}

