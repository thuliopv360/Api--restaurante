import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Thulio',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'Thulio@example.com',
  })
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @MinLength(6)
  @ApiProperty({
    example: '@Abc123',
    description: 'Deveria ter no minimo 1 simbolo 1 letra maiuscula e 1 numero',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  cities: string;

  @IsNumber()
  @IsNotEmpty()
  cep: number;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;
}
