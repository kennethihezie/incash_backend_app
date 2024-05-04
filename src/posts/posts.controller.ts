import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './model/dto/post.dto';
import { Response, Request } from 'express';
import { AppMessages } from 'src/lib/constants/app_messages';
import { AppCodes } from 'src/lib/constants/app_code';
import { UpdatePostDto } from './model/dto/update-post.dto';
import { AccessTokenGuard } from 'src/authentication/guard/access-token.guard';
import { ResponseFormat } from 'src/lib/exception/request_format';


@UseGuards(AccessTokenGuard)
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Post()
    async createPost(@Body() postDto: PostDto, @Res() response: Response, @Req() req: Request) {
        const userId = req.user['sub']
        return ResponseFormat.handleSuccesResponse(response, AppMessages.POST_CREATED, AppCodes.SUCCESSFUL, await this.postService.createPost({...postDto, userId: userId}))
    }

    @Patch('/:id')
    async editPost(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto, @Res() response: Response) {        
        return ResponseFormat.handleSuccesResponse(response, AppMessages.POST_EDITTED, AppCodes.SUCCESSFUL, await this.postService.editPost(postId, updatePostDto))
    }

    @Get()
    async getAllPosts(@Res() response: Response, @Req() req: Request) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.POSTS_FETCHED, AppCodes.SUCCESSFUL, await this.postService.getAllPosts())
    }

    @Get('/user')
    async getUserPost(@Res() response: Response, @Req() req: Request) {
        const userId = req.user['sub']
        return ResponseFormat.handleSuccesResponse(response, AppMessages.USERS_POST_FETCHED, AppCodes.SUCCESSFUL, await this.postService.getUserPost(userId))
    }


    @Get('/:id')
    async getPost(@Param('id') postId: string, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.POST_FETCHED, AppCodes.SUCCESSFUL, await this.postService.getPost(postId))
    }


    @Delete('/:id')
    async deletePost(@Param('id') postId: string, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.POST_DELETED, AppCodes.SUCCESSFUL, await this.postService.deletePost(postId))
    }
}
