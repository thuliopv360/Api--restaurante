import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Numero da mesa que fez o pedido',
    example: 10,
  })
  tableNumber: number;

  @ApiProperty({
    description: 'Numero do id do usuario que fez o pedido',
    example: 'e39bfac3-f1b6-4c49-82e8-c2799338faee',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de ids dos produtos que estao no pedido',
    example: `['e39bfac3-f1b6-4c49-82e8-c2799338faee', 'e39bfac3-f1b6-4c49-82e8-c2799338faee']`,
  })
  @IsUUID(undefined, { each: true })
  products: string[];
}
