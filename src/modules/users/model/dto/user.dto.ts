import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Match } from "src/lib/decorators/match.decorator";

export class UserDto{
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    avaterUrl: string

    @IsString()
    @IsStrongPassword()
    password: string

    @Match(UserDto, (c: UserDto) => c.password)
    confirmPassword: string
}