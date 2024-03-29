import { IsNotEmpty, IsString } from 'class-validator';

export class SizeDto {
  @IsNotEmpty()
  @IsString()
  size: string;
  id: string;
}
