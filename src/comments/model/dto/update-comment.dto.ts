import { PartialType } from "@nestjs/mapped-types";
import { Comment } from "../schema/comment.schema";

export class UpdateCommentDto extends PartialType(Comment) {}