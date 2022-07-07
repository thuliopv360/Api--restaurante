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

    if (product === null) {
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

  favorite(dto: FavoriteProductDto) {
    return this.prisma.favorite.create({ data: dto });
  }

  disfavoring(id: string) {
    return this.prisma.favorite.delete({ where: { id } });
  }

  async findUsersLiked(id: string) {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    return this.prisma.favorite.findMany({
      where: { productName: product.name },
      select: {
        productName: true,
      },
    });
  }
}
