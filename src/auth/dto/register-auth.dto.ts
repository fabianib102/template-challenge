import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../enum/roles';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEnum(ROLES)
    role: string = ROLES.REGULAR;
}
