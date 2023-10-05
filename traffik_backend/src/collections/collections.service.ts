import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsDto } from 'src/collections/dto/items';

@Injectable()
export class CollectionsService {
    constructor(
		private prisma: PrismaService,
    ){}

    async allItems(){
        return await this.prisma.item.findMany();
    }

    async createItems(body): Promise<ItemsDto> 
    {
        const response = await body as ItemsDto;
        return await this.prisma.item.create({data:response});
    }
}

