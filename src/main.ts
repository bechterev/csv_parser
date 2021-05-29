import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DownloadFileService} from './films/services/download-file/download-file.service';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '500mb'  }));
  await app.listen(3000);
}
bootstrap();
