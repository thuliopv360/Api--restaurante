import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email do usuario que esta tentando logar',
    example: 'usuario@gmail.com',
  })
  email: string;
  @IsString()
  @ApiProperty({
    description: 'Senha do usuario ',
    example: '1A1j2k3@',
  })
  password: string;
}
