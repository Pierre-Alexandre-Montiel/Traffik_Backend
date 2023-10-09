import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsDto } from 'src/collections/dto/items';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import axios from 'axios';
import { SizeDto } from './dto/size';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

interface Item {
    barecode: string,
    season: string,
    style:string, 
    typeId: string,
    color: string,
    location: string,
    replacementValue: string,
  };

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async allItems() {
    return await this.prisma.item.findMany();
  }

  async oneItem(body) {
    return await this.prisma.item.findMany({
      where: {
        style: body.style,
      },
    });
  }
  async findItemByStyle(style: string) {
    return await this.prisma.item.findFirst({
      where: {
        style: style,
      },
    });
  }
  /*async createItems(body): Promise<ItemsDto> {
    const response = (await body) as ItemsDto;
    return await this.prisma.item.create({ data: response });
  }*/


  async importProductsFromCsv(filePath: string): Promise<void> {
    const stream = fs.createReadStream(filePath);
    let i = 0;
    const csvStream = csv.parse({ headers: true })
      .on('data', async (res) => {
        // Assuming your CSV columns match your Product model fields
        //const infos = await res as ItemsDto;
        await this.prisma.item.create({ data: res });
        /*const itemData: Prisma.ItemCreateInput = {
          barecode: infos.barcode,
          season: infos.season,
          style: infos.style,
          typeId: infos.typeId,
          color: infos.color,
          location: infos.location,
          replacementValue: infos.replacementValue,
        };
        const sty = await this.findItemByStyle(infos.style);
        console.log("i = ", i);
        console.log("style = ", infos.style);
        console.log("RES = ", sty);
        try {
          if (!sty) {
            console.log("Item doesn't exist, creating...");
            i += 1;
            await this.prisma.item.create({ data: itemData });
          }
          console.log("Item exists, creating size...");
          await this.prisma.sizes.create({
            data: {
              size: res.size,
              id : randomUUID(),
              // Use connect to reference the Item by its barecode
              item: { connect: { barecode: infos.barcode } },
            },
          });
        } catch (error) {
          console.error('Error creating item or size:', error);
        }*/
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      })
      .on('error', (error) => {
        console.error('Error processing CSV file:', error);
        throw error;
      });
    stream.pipe(csvStream);
  }

  async downloadFileFromGoogleDrive(destination: string): Promise<void> {
      console.log("Download");
    const response = await axios.get(process.env.SHEET, { responseType: 'arraybuffer' });

    fs.writeFileSync(destination, Buffer.from(response.data));
  }

  async searchRequest(body) {
    return await this.prisma.item.findMany({
        where: {
          OR: [
            { style: { contains: body.query, mode: 'insensitive' } },
           // { description: { contains: body.query, mode: 'insensitive' } },
          ],
        },
      });
  }
}
