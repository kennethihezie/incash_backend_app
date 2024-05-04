import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
    timestamps: true
})
export class Comment extends Document {
    @Prop()
    userId: string

    @Prop()
    postId: string

    @Prop()
    comment: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)