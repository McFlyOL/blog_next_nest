import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/blog/entities/post/post.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthorEntity } from './entities/author/author.entity';
import { CommentEntity } from './entities/comment/comment.entity';
import { TagEntity } from './entities/tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CommentEntity, AuthorEntity, TagEntity])
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
