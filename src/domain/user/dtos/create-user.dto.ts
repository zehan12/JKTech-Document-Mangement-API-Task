import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;

}