import { PartialType } from "@nestjs/mapped-types";
import { Post } from "../schema/post.schema";

export class UpdatePostDto extends PartialType(Post) {}