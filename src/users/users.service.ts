import { CreateUserDto } from './dto/create-users.dto';
import { User } from './entity/users.entity';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
  users: User[] = [];

  getAll() {
    return this.users;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuid(),
      ...createUserDto,
      created_at: undefined,
      updated_at: undefined,
    };
    this.users.push(newUser);
    return newUser;
  }
}
