import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UUIDParam } from 'src/common/param.decorator';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchMany() {
    return await this.userService.fetchMany();
  }

  @Get(':id')
  async fetchOne(@UUIDParam('id') id: string) {
    return await this.userService.fetchOne({ id });
  }

  @Post()
  async create(@Body() params: CreateUserDto) {
    return await this.userService.create({ ...params });
  }

  @Patch(':id')
  async update(@UUIDParam('id') id: string, @Body() params: UpdateUserDto) {
    return await this.userService.update({ id, ...params });
  }

  @Delete(':id')
  async delete(@UUIDParam('id') id: string) {
    return await this.userService.delete({ id });
  }
}
