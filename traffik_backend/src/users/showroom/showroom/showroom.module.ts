import { Module } from '@nestjs/common';
import { ShowroomService } from './showroom.service';

@Module({
  providers: [ShowroomService],
})
export class ShowroomModule {}
