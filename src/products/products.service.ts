import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { handleErrorConstraintUnique } from './../utils/handle-error-unique.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<Product | void> {
    return this.prisma.product
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async findAll(query): Promise<Product[]> {
    const products: Product[] = await this.prisma.product
      .findMany({ where: query })
      .catch(() => {
        throw new UnprocessableEntityException('Formato de query invalida');
      });
    if (products.length === 0) {
      throw new NotFoundException(
        'Nenhuma entrada encontrada com o query param aplicado',
      );
    }
    return products;
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
}
