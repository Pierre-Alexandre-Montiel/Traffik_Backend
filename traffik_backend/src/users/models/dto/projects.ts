import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import internal from 'stream';

export class ProjectDto {
  @IsNotEmpty()
  event: string;
  userId: string;
}
