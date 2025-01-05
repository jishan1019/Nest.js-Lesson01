import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  findAllFromDB(role?: 'admin' | 'user') {}

  findOneFromDB(id: string) {
    if (!id) {
      throw new NotFoundException('Id not found');
    }
  }

  createUserFromDB(user: CreateUserDto) {}

  updateUserFromDB(id: string, user: UpdateUserDto) {}

  deleteUserFromDB(id: string) {}
}
