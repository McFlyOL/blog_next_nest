import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, CreateDateColumn, JoinTable } from 'typeorm';
import { AuthorEntity } from '../author/author.entity';
import { CommentEntity } from '../comment/comment.entity';
import { TagEntity } from '../tag/tag.entity';


@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn({name: 'post_id'})
    id: number;

    @Column()
    title: string;

    @Column({length: 50})
    subtitle: string;
   
    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => AuthorEntity, author => author.post)
    author: AuthorEntity;

    @OneToMany(type => CommentEntity, comment => comment.post)
    comments: CommentEntity[];

    @ManyToMany(type => TagEntity)
    @JoinTable({name : 'posts_tags'})
    tags: TagEntity[];
}