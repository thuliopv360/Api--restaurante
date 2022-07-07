import { handleErrorConstraintUnique } from './../utils/handle-error-unique.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-users.dto';
import { User } from './entity/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class UsersService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    country: false,
    state: false,
    cities: false,
    cep: false,
    district: false,
    street: false,
    number: false,
    updatedAt: true,
    createdAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User | void> {
    const hashedPassword = await bcrypt.hash(dto.password, 8);

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

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select: this.userSelect });
  }

  async verifyIdAndReturnUser(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (user === null) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }
    return user;
  }

  findOne(id: string) {
    return this.verifyIdAndReturnUser(id);
  }

  findFavoriteProducts(id: string): Promise<Favorite[]> {
    return this.prisma.favorite.findMany({
      where: { userId: id },
      select: { productName: true, userId: false, createdAt: false },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | void> {
    await this.verifyIdAndReturnUser(id);

    return this.prisma.user
      .update({ where: { id }, data: dto, select: this.userSelect })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnUser(id);
    return this.prisma.user.delete({
      where: { id },
      select: this.userSelect,
    });
  }
}
