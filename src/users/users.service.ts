import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAllFromDB(role?: 'admin' | 'user') {}

  findOneFromDB(id: string) {}
}
