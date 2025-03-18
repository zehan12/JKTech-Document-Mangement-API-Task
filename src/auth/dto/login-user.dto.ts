import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;

}