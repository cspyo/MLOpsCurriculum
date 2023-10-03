import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';
import { UserRole } from './user.types';

@Entity()
export class User extends CommonEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.COMMON })
  role: UserRole;

  public get isAdmin() {
    return this.role === UserRole.ADMIN;
  }
}
