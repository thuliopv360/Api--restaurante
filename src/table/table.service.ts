import { Table } from './entities/table.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateTableDto){
    return 'This action adds a new table';
  }

  findAll() {
    return `This action returns all table`;
  }

  findOne(id: string) {
    return `This action returns a #${id} table`;
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: string) {
    return `This action removes a #${id} table`;
  }
}
