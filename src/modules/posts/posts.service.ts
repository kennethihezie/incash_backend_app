import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './model/schema/post.schema';
import { Model } from 'mongoose';
import { PostDto } from './model/dto/post.dto';
import { CustomException } from 'src/lib/exception/custom_exception';
import { UpdatePostDto } from './model/dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async createPost(postDto: PostDto): Promise<Post> {
        try {
            return await (new this.postModel(postDto).save())
        } catch(e) {            
            throw new CustomException("Post not created", HttpStatus.BAD_REQUEST)
        }
    }

    async editPost(postId: string, updatePostDto: UpdatePostDto): Promise<Post> {        
        const post = await this.postModel.findByIdAndUpdate(postId, updatePostDto, {
            new: true
        })        

        if(!post) {
            throw new NotFoundException(`Post with id: ${postId} not found`)
        }

        return post
    }

    async getPost(postId: string): Promise<Post> {
        const post = await this.postModel.findById(postId)

        if(!post){
            throw new NotFoundException('Post not found!')
        }

        return post
    }

    async getUserPost(userId: string): Promise<Post[]> {
        return await this.postModel.find({ userId }).exec()
    }

    async getAllPosts(): Promise<Post[]> {
        return await this.postModel.find().exec()
    }

    async deletePost(postId: string): Promise<Post> {
        const post = await this.postModel.findByIdAndDelete(postId)        

        if(!post){
            throw new NotFoundException(`Post with id: ${postId} not found`)
        }

        return post
    }
}
