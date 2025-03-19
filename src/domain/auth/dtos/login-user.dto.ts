import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        description: 'User email',
        example: 'zehan@gmail.com',
        type: String,
        required: true,
        uniqueItems: true,
        format: 'email',
        minLength: 5,
        maxLength: 60,
        nullable: false,
    })
    @IsEmail({}, { message: "Invalid email format" })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '123456789',
        type: String,
        required: true,
        minLength: 6,
        maxLength: 60,
        nullable: false,
      })
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;
}
