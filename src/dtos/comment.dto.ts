import { AuthorEntity } from "src/blog/entities/author/author.entity";

export class CommentDto{
    content: string;
    author : AuthorEntity;
}