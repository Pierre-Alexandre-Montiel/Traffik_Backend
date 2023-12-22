import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TalentDto {
  @IsNotEmpty()
  @IsString()
  firtsName: string;
  lastName: string;
  @IsEmail()
  email: string;
  tiktok: string;
}
