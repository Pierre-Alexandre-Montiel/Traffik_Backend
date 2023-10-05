import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import internal from 'stream';

export class ItemsDto {
  @IsNotEmpty()
  color: string;
  size: string;
  picture: string;
}
