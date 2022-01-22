import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { PostEntity } from '../post/post.entity';

@Entity('authors')
export class AuthorEntity {

    @PrimaryGeneratedColumn({name: 'author_id'})
    id: number;

    @Column({ length: 25 })
    fullName:string;

    @Column({ length: 25 })
    email:string;
    
    @OneToMany(type => PostEntity, post => post.author)
    post: PostEntity;

    @OneToMany(type => CommentEntity, comment => comment.author)
    comment: CommentEntity;
 
}