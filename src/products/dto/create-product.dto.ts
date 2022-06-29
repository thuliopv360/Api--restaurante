import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Feijao Tropeiro',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'descricao do produto',
    example: 'Feijao com farinha e carne',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'ingrediente do produto',
    example: 'Feijao, carne, farinha',
  })
  ingredient: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ApiProperty({
    description: 'Preco do produto',
    example: 'R$ 2.00',
  })
  price: number;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do produto',
    example:
      'https://media.istockphoto.com/photos/beautiful-background-from-texture-closeup-decorative-venetian-stucco-picture-id1189093751',
  })
  image: string;
}
