import { FavoriteProductDto } from '../favorites/dto/favorite-product.dto';
import { handleErrorConstraintUnique } from './../utils/handle-error-unique.util';
import { Product } from './entities/product.entity';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/entity/users.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({ include: { category: true } });
  }

  async verifyIdAndReturnProduct(id: string): Promise<Product> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }
    return product;
  }

  handleError(error: Error) {
    const splitedMessage = error.message.split('`');

    const errorMessage = `Entrada '${
      splitedMessage[splitedMessage.length - 2]
    }' nao esta respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<Product> {
    return this.verifyIdAndReturnProduct(id);
  }

  async findUsersLiked(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    return this.prisma.favorite.findMany({
      where: { productName: product.name },
      select: {
        productName: true,
        user: { select: { id: true, email: true } },
      },
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
    await this.verifyIdAndReturnProduct(id);

    return this.prisma.product
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnProduct(id);

    return this.prisma.product.delete({ where: { id } });
  }

  async favorite(dto: FavoriteProductDto) {
    const product: Product = await this.prisma.product.findUnique({
      where: { name: dto.productName },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto de nome '${dto.productName}' não encontrado`,
      );
    }

    const user: User = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Entrada de id '${dto.userId}' não encontrada`,
      );
    }
    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: dto.userId,
        },
      },
      product: {
        connect: {
          name: dto.productName,
        },
      },
    };
    return this.prisma.favorite.create({ data });
  }

  async dislike(id: string) {
    await this.verifyIdAndReturnProduct(id);

    return this.prisma.favorite.delete({ where: { id } });
  }
}
