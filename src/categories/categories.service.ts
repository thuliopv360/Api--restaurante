import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: dto });
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async verifyIdAndReturnCategory(id: string): Promise<Category> {
    const category: Category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (category === null) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }
    return category;
  }

  findOne(id: string): Promise<Category> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
      select: { name: true },
    });
  }
}
