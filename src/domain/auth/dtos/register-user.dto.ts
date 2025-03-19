import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {

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
    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    password: string;

}