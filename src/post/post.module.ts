import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UsersResolver } from '../users/users.resolver';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, User])],
  controllers: [PostController],
  providers: [PostService, PostResolver,  UsersService, UsersResolver,],
})
export class PostModule {}