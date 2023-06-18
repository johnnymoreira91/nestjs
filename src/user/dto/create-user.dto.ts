import { IsBoolean, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';
import { CreateUser } from 'src/models/users';

export class CreateUserDto implements CreateUser {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsNotEmpty()
  @IsBoolean()
  superUser: boolean;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password;

  // @IsEmpty()
  // createdAt: Date;

  // @IsEmpty()
  // updatedAt: Date;
}
