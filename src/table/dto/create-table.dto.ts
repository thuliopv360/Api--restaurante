import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTableDto {
  @IsUUID()
  @IsString()
  @ApiProperty({
    description: 'id da mesa',
    example: 'e39bfac3-f1b6-4c49-82e8-c2799338faee',
  })
  id: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Numero da mesa a ser criada',
    example: 1,
  })
  number: number;
}
