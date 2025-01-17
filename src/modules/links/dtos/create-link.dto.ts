import { IsDate, IsOptional, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  originalURL: string;

  @IsString()
  @IsOptional()
  customUrl?: string;

  @IsString()
  @IsOptional()
  @Min(6)
  password?: string;

  @IsString()
  @IsOptional()
  @IsDate()
  expirationDate?: Date;
}
