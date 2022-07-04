import { Table } from './entities/table.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateTableDto): Promise<Table> {
    return this.prisma.table.create({ data: dto }).catch(this.handleError);
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async verifyIdAndReturnTable(id: string): Promise<Table> {
    const table: Table = await this.prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      throw new NotFoundException(`Entrada de id ${id} nao encontrada`);
    }
    return table;
  }

  handleError(error: Error): never {
    const splitedMessage = error.message.split('`');

    const errorMessage = `Entrada '${
      splitedMessage[splitedMessage.length - 2]
    }' nao esta respeitando a constraint UNIQUE`;

    throw new UnprocessableEntityException(errorMessage);
  }

  findOne(id: string): Promise<Table> {
    return this.verifyIdAndReturnTable(id);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    await this.verifyIdAndReturnTable(id);

    return this.prisma.table
      .update({ where: { id }, data: dto })
      .catch(this.handleError);
  }

  async remove(id: string) {
    await this.verifyIdAndReturnTable(id);

    return this.prisma.table.delete({
      where: { id },
      select: { number: true, id: true },
    });
  }
}
