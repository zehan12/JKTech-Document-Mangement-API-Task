import { ApiProperty } from '@nestjs/swagger';

export class GetCurrentUserDto {
    @ApiProperty({
        description: "User ID",
        example: "fbec0a3d-26f8-441d-8b08-cd477ce0194d",
    })
    id: string;

    @ApiProperty({
        description: "User email",
        example: "zehan@gmail.com",
    })
    email: string;

    @ApiProperty({
        description: "User role",
        example: "EDITOR",
    })
    role: string;
}
