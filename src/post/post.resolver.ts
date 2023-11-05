import { Get,  Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersResolver } from '../users/users.resolver';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Posts } from './entities/post.entity';

@Resolver('post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly usersResolver: UsersResolver
    ) {}
                 
  @Mutation(() => Posts)
  async createPosts(
    @Args('createPost') createPostDto: CreatePostDto,
    @Args('authorId') authorId: number): Promise<Posts> {
    const author = await this.usersResolver.findOneUser(authorId);
    return this.postService.create(createPostDto, author);
  }

  @Query(() => [Posts])
  findAllPosts() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOnePost(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
