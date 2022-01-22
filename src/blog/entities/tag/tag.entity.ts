import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {PostEntity} from "../post/post.entity";

    @Entity('tags')
    export class TagEntity {

        @PrimaryGeneratedColumn({name: 'tag_id'})
        id: number;

        @Column()
        name: string;

        @ManyToMany(type => PostEntity, post => post.tags)
        post: PostEntity;

    }



