import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './model/dto/comment.dto';
import { CustomException } from 'src/lib/exception/custom_exception';
import { UpdateCommentDto } from './model/dto/update-comment.dto';
import { Comment } from './model/schema/comment.schema';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

    async createComment(commentDto: CommentDto): Promise<Comment> {
        try {
            return await (new this.commentModel(commentDto).save())
        } catch(e) {            
            throw new CustomException("Comment not created", HttpStatus.BAD_REQUEST)
        }
    }

    async editComment(commentId: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {        
        const comment = await this.commentModel.findByIdAndUpdate(commentId, updateCommentDto, {
            new: true
        })        

        if(!comment) {
            throw new NotFoundException(`Comment with id: ${commentId} not found`)
        }

        return comment
    }

    async getComment(commentId: string): Promise<Comment> {
        const comment = await this.commentModel.findById(commentId)

        if(!comment){
            throw new NotFoundException('Comment not found!')
        }

        return comment
    }

    async getUserComments(userId: string): Promise<Comment[] | null> {
        const comments = await this.commentModel.find({ userId }).exec()

        if(!comments){
            return null;
        }

        return comments
    }

    async deleteComment(commentId: string): Promise<Comment> {
        const post = await this.commentModel.findByIdAndDelete(commentId)        

        if(!post){
            throw new NotFoundException(`Comment with id: ${commentId} not found`)
        }

        return post
    }
}
