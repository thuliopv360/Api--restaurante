import { Product } from './entities/product.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data: dto });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
