import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps: true
})
export class Post extends Document {
    @Prop()
    userId: string

    @Prop()
    postText: string

    @Prop()
    postImageUrl: string

    @Prop()
    postVideoUrl: string

    @Prop({ default: 0 })
    likeCount: number
}

export const PostSchema = SchemaFactory.createForClass(Post)