import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(10)
  @IsNumberString()
  @IsOptional()
  mobile?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
