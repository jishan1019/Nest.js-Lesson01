import { isEmail, isNotEmpty, isString } from 'class-validator';

export class CreateUserDto {
  // @isString()
  // @isNotEmpty()
  name: string;

  // @isEmail()
  email: string;
}
