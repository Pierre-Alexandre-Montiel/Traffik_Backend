import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsDto } from 'src/collections/dto/items';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import axios from 'axios';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async allItems() {
    return await this.prisma.item.findMany();
  }

  async oneItem(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createItems(body): Promise<ItemsDto> {
    const response = (await body) as ItemsDto;
    return await this.prisma.item.create({ data: response });
  }

  async importProductsFromCsv(filePath: string): Promise<void> {
    const stream = fs.createReadStream(filePath);
    const csvStream = csv.parse({ headers: true })
      .on('data', async (data) => {
        // Assuming your CSV columns match your Product model fields
        const picture = process.env.IMG + data.style + ".jpg";
        data.picture = picture;
        console.log("DATA = ", data);
        await this.prisma.item.create({ data});
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
}
