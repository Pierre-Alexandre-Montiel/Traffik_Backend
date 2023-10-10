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

  async uploadItemsImages(filePath:string){
    const stream = fs.createReadStream(filePath);
    let i = 0;
    const csvStream = csv.parse({ headers: true })
      .on('data', async (res) => {
        await this.prisma.pictures.create({
          data: {
            pics: process.env.IMG + res.barcode + ".jpg",
            // Use connect to reference the Item by its barcode
            link: { connect: { barcode: res.barcode } },
          },
        });
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

  async importProductsFromCsv(filePath: string): Promise<void> {
    const stream = fs.createReadStream(filePath);
    let i = 0;
    const csvStream = csv.parse({ headers: true })
      .on('data', async (res) => {
        // Assuming your CSV columns match your Product model fields
        //const infos = await res as ItemsDto;
        console.log("RES = ", res)
        await this.prisma.item.create({ data: res });
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
