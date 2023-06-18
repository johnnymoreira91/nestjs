import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  Matches,
} from 'class-validator';
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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password;

  // @IsEmpty()
  // createdAt: Date;

  // @IsEmpty()
  // updatedAt: Date;
}
