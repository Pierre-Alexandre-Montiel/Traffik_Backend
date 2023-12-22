import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
