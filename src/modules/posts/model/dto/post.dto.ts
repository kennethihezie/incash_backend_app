import { IsOptional, IsString } from "class-validator";

export class PostDto {
    @IsString()
    @IsOptional()
    userId?: string

    @IsString()
    postText: string

    @IsString()
    @IsOptional()
    postImageUrl?: string

    @IsString()
    @IsOptional()
    postVideoUrl?: string
}