import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  CreateUserParams,
  DeleteUserParams,
  FetchOneUserParams,
  UpdateUserParams,
} from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async fetchMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async fetchOne(params: FetchOneUserParams): Promise<User> {
    const { id } = params;
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async isUsernameDuplicated(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    return !!user;
  }

  private async isEmailDuplicated(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return !!user;
  }

  async create(params: CreateUserParams) {
    const { username, email, age, role } = params;

    if (await this.isUsernameDuplicated(username)) {
      throw new ConflictException('Username is duplicated');
    }

    if (await this.isEmailDuplicated(email)) {
      throw new ConflictException('Email is duplicated');
    }

    const user = this.userRepository.create({
      username,
      email,
      age,
      role,
    });

    return user;
  }

  async update(params: UpdateUserParams) {
    const { id, username, age, role } = params;

    if (username && (await this.isUsernameDuplicated(username))) {
      throw new ConflictException('Username is duplicated');
    }

    const result = await this.userRepository.update(
      { id },
      { username, age, role },
    );

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(params: DeleteUserParams) {
    const { id } = params;

    const result = await this.userRepository.softDelete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return { id };
  }
}
