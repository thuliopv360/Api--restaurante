import { Product } from './entities/product.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, dto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}