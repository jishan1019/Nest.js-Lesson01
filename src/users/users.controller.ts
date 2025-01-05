import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

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

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOneFromDB(id);
  }

  @Post() // POST /users
  createUser(@Body() payload: {}) {
    return payload;
  }

  @Patch(':id') // PATCH /users/:id
  updateUser(@Param('id') id: string, @Body() payload: {}) {
    return {
      id,
      ...payload,
    };
  }

  @Delete(':id') // Delete /user/:id
  deleteUser(@Param('id') id: string) {
    return { id };
  }
}
