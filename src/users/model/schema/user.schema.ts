import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop({ unique: true })
    email: string

    @Prop()
    avaterUrl: string

    @Prop()
    refreshToken: string

    @Prop()
    @Exclude()
    password: string

    @Prop({default: false})
    isVerified: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)