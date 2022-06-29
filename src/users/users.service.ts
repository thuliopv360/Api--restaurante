import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './entity/users.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(dto.password, 8);

    const data: CreateUserDto = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      country: dto.country,
      state: dto.state,
      cities: dto.cities,
      cep: dto.cep,
      district: dto.district,
      street: dto.street,
      number: dto.number,
    };

    return this.prisma.user.create({ data });
  }

  getById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        name: true,
        email: true,
      },
    });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }
}
