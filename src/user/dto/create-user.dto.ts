import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  Matches,
} from 'class-validator';
import { CreateUser } from 'src/models/users';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements CreateUser {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  roleId: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  superUser: boolean;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty()
  password;

  // @IsEmpty()
  // createdAt: Date;

  // @IsEmpty()
  // updatedAt: Date;
}
