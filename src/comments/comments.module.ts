import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './model/schema/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [ MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]) ],
})
export class CommentsModule {}
