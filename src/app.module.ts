import { HttpModule, HttpService, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { DownloadFileService } from './films/services/download-file/download-file.service';
import { promisify } from 'util';
import { InfofilmsController } from './films/infofilms/infofilms.controller';
import { InfomovieService } from './films/services/infomovie/infomovie.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://film:260521@cluster0.jdgs4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
FilmsModule,
HttpModule.register({timeout:180000}),
],
  controllers: [AppController],
  providers: [AppService, DownloadFileService],
})
export class AppModule {}
