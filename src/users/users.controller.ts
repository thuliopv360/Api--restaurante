import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuario',
  })
  create(@Body() dto: CreateUserDto): Promise<User | void> {
    return this.usersService.create(dto);
  }
  @Get()
  @ApiOperation({
    summary: 'Lista todos os usuários',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista Usuario por id',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um usuario',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | void> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um usuario',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
