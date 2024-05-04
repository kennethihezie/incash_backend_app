import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CommentDto {
    @IsString()
    @IsOptional()
    userId?: string

    @IsString()
    @IsNotEmpty()
    postId: string

    @IsString()
    @IsNotEmpty()
    comment: string
}