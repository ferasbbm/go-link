import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @Length(10, 10, { message: 'Mobile number must be 10 digits long' })
  @IsNumberString({}, { message: 'Mobile number must contain only digits' })
  @IsOptional()
  mobile?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
