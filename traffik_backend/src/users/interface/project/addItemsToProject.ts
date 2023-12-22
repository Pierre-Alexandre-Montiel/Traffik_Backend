import { IsNotEmpty, IsString } from 'class-validator';

export class AddItemsToProjectParams {
  @IsNotEmpty()
  @IsString()
  id: string;
  barcode: string;
}
