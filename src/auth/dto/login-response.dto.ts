import { User } from 'src/users/entity/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token gerado no login',
    example: 'lksndojnsjdbvijsbdijvbisbdvijbskjbvibskjdbvkjbsdkjvb',
  })
  token: string;
  user: User;
}
