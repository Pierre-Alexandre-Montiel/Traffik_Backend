import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import internal from 'stream';

export class SizeDto {
  @IsNotEmpty()
  size: string;
  id: string;
}
