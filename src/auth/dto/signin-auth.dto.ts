import { IsString } from 'class-validator';

export class SignInAuthDto {
  @IsString()
  login_name: string;

  @IsString()
  pass: string;
}
