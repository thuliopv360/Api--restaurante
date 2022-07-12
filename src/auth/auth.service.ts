import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entity/users.entity';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user: User = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('Email ou senha invalidos');
    }

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Senha invalida');
    }

    delete user.password;

    const token: string = this.jwtService.sign({ email });

    return { token, user };
  }
}
