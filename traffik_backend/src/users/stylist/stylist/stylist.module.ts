import { Module } from '@nestjs/common';
import { StylistService } from './stylist.service';

@Module({
  providers: [StylistService],
})
export class StylistModule {}
