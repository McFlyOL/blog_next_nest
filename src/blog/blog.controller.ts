import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post, Put } from '@nestjs/common';
import { AuthorDto } from 'src/dtos/author.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { PostDto } from 'src/dtos/post.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {

    constructor(private readonly blogService: BlogService){}

    @Get()
    getAll(){
      return this.blogService.getPosts();
    }

    @Get("/authors")
    getAllAuthors(){
      return this.blogService.getAuthors();
    }

    @Get(':postId')
    async getOne(@Param('postId') postId){
        const post = await this.blogService.getOnePost(postId);
        if(post)
            return post;
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    @Post()
    async createPost(@Body() postDto: PostDto){
        const post = await this.blogService.createPost(postDto);
        if(post)
            return post;
        throw new HttpException('Not Created', HttpStatus.NOT_MODIFIED);
    }

    @Post("author")
    async createAuthor(@Body() authorDto: AuthorDto){
        const author = await this.blogService.createAuthor(authorDto);
        if(author)
            return author;
        throw new HttpException('Not Created', HttpStatus.NOT_MODIFIED);
    }

    @Put(':postId')
    async updatePost(@Param('postId') postId, @Body() postDto: PostDto){
        const post = await this.blogService.updatePost(postId,postDto);
        if(post)
            return post;
        throw new HttpException('Not Modified ', HttpStatus.NOT_MODIFIED);
    }

    @Delete(':postId')
    async removePost(@Param('postId') postId){
        const post = await this.blogService.removePost(postId);
        if(post)
            return post;
        throw new HttpException('Not Found ', HttpStatus.NOT_FOUND);
    }

    @Post('comment/:postId')
    async addComment(@Param('postId') postId, @Body() commentDto: CommentDto){
        const comment = await this.blogService.addComment(postId, commentDto);
        if(comment)
            return comment;
        throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED);
    }

    @Put('comment/point/:commentId')
    async incrementPointsComment(@Param('commentId') commentId, @Body() commentDto: CommentDto){
        const comment = await this.blogService.incrementPointsComment(commentId, commentDto);
        if(comment)
            return comment;
        throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED);
    }

    @Post('tag/:tagName')
    async addTag(@Param('tagName') tagName){
        const tag = await this.blogService.addTag(tagName);
        if(tag)
            return tag;
        throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED);
    }

    @Patch(':postId/tag/:tagId')
    async tagArticle(@Param('postId') postId: number, @Param('tagId') tagId: number){
        const post = await this.blogService.tagArticle(postId, tagId);
        if(post)
            return post;
        throw new HttpException('Not modified', HttpStatus.NOT_MODIFIED);
    }

}
