import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './model/schema/post.schema';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [ MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]) ],
})
export class PostsModule {}
