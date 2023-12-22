import { IsNotEmpty, IsString } from 'class-validator';

export class AddProjectToUserParams {
  @IsNotEmpty()
  @IsString()
  id: string;
  projectId: string;
}
