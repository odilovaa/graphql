import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async findAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async findOneUser(@Args('id') id: number)  {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUser') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Mutation(() => User)
  async updateUser(
   @Args('id') id: number, 
   @Args('updateUser') updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Mutation(() => Number)
  async removeUser(
    @Args('id', { type: () => ID }) id: number,
    ): Promise<number>{
    return this.usersService.remove(+id);
  }
}
