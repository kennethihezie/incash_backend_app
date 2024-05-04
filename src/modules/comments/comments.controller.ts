import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './model/dto/comment.dto';
import { Response, Request } from 'express';
import { AppMessages } from 'src/lib/constants/app_messages';
import { AppCodes } from 'src/lib/constants/app_code';
import { UpdateCommentDto } from './model/dto/update-comment.dto';
import { AccessTokenGuard } from 'src/modules/authentication/guard/access-token.guard';
import { ResponseFormat } from 'src/lib/exception/request_format';


@UseGuards(AccessTokenGuard)
@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) { }

    @Post()
    async createComment(@Body() commentDto: CommentDto, @Res() response: Response, @Req() req: Request) {
        const userId = req.user['sub']

        return ResponseFormat.handleSuccesResponse(response, AppMessages.COMMENT_CREATED, AppCodes.SUCCESSFUL, await this.commentService.createComment({...commentDto, userId: userId}))
    }

    @Patch('/:id')
    async editComment(@Param('id') commentId: string, @Body() updateCommentDto: UpdateCommentDto, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.COMMENT_EDITTED, AppCodes.SUCCESSFUL, await this.commentService.editComment(commentId, updateCommentDto))
    }

    @Get('/user')
    async getUserComments(@Res() response: Response, @Req() req: Request) {
        const userId = req.user['sub']
        return ResponseFormat.handleSuccesResponse(response, AppMessages.COMMENTS_FETCHED, AppCodes.SUCCESSFUL, await this.commentService.getUserComments(userId))
    }

    @Get('/:id')
    async getComment(@Param('id') commentId: string, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.COMMENT_FETCHED, AppCodes.SUCCESSFUL, await this.commentService.getComment(commentId))
    }

    @Delete('/:id')
    async deleteComment(@Param('id') commentId: string, @Res() response: Response) {
        return ResponseFormat.handleSuccesResponse(response, AppMessages.COMMENTS_DELETED, AppCodes.SUCCESSFUL, await this.commentService.deleteComment(commentId))
    }
}
