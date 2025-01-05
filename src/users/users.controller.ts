import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users
  findAll(@Query('role') role?: 'admin' | 'user') {
    return this.usersService.findAllFromDB(role);
  }

  @Get() // GET /users/list
  findAllList() {
    return [];
  }

  @Get(':id') // GET /users/:id`
  findOne(@Param('id') id: string) {
    return this.usersService.findOneFromDB(id);
  }

  @Post() // POST /users
  createUser(@Body(ValidationPipe) payload: CreateUserDto) {
    return this.usersService.createUserFromDB(payload);
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdateUserDto,
  ) {
    return this.usersService.updateUserFromDB(id, payload);
  }

  @Delete(':id') // Delete /user/:id
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserFromDB(id);
  }
}
