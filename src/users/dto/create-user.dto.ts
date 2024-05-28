import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(4)
    @MaxLength(12)
    @IsNotEmpty()
    password: string
}
