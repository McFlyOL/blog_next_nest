import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { AuthorEntity } from "../author/author.entity";
import { PostEntity } from "../post/post.entity";

@Entity('comments')
export class CommentEntity {

    @PrimaryGeneratedColumn({name: 'comment_id'})
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column('text')
    content: string;

    @Column({ type:'int', default: 1 })
    points: number;
    
    @ManyToOne(type => AuthorEntity, author => author.comment)
    author: AuthorEntity;

    @ManyToOne(type => PostEntity, post => post.comments, {onDelete: 'CASCADE'})
    post: PostEntity;
}


