import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtStrategy],
})
export class CategoriesModule {}
