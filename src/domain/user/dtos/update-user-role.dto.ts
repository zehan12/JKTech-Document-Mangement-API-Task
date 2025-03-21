import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {

    @ApiProperty({
        description: "User role",
        example: "ADMIN",
    })
    role: string;
}
