import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  login_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  pass: string;

  @IsNotEmpty()
  rePass: string;
}
