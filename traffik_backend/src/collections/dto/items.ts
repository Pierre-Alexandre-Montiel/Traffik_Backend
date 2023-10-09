import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import internal from 'stream';

export class ItemsDto {
  @IsNotEmpty()
  barcode: string;
  season: string;
  style: string;
  typeId: string;
  color: string;
  location: string;
  replacementValue: string;
}
