import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRole } from './user.types';

export interface FetchOneUserParams {
  id: string;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsEnum(UserRole)
  role: UserRole;
}

export interface CreateUserParams extends CreateUserDto {}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export interface UpdateUserParams extends UpdateUserDto {
  id: string;
}

export interface DeleteUserParams {
  id: string;
}
