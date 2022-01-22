import { AuthorEntity } from "src/blog/entities/author/author.entity";

export class PostDto{
    title: string;
    subtitle: string;
    image: string;
    author: AuthorEntity;
}