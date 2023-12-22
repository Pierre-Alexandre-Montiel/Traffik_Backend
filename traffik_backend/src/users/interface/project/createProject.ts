import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectParams {
  @IsNotEmpty()
  @IsString()
  event: string;
}
