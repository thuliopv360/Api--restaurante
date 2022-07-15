import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
