import { Controller, Get, HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { DownloadFileService } from './films/services/download-file/download-file.service';
import * as fs from 'fs';
import { InfofilmsController } from './films/infofilms/infofilms.controller';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly download: DownloadFileService, private http: HttpService) { }

  @Get()
  async getHello(): Promise<string> {
    await this.getFile('Rating')
    await this.getFile('InfoMovie')
    let strRating = this.http.get('http://localhost:3000/rating').subscribe(x => console.log(x.data));
    return this.appService.getHello();
  }
  async getFile(file: string) {
    let fileInfo = await this.download.readAllLine(file).toPromise();
    let array = fileInfo.data.toString().split("\n");
    let result = [];
    let headers = array[0].split(",");
    let field;
    let delimiter;
    let apiLink;
    if (file == "Rating") {
      delimiter = /,\"|\",|,(?! )/;
      field = ['id', 'original_title'];
      apiLink = 'infofilms';
      
    }
    else {
      delimiter = ",";
      field = ['movieId', 'rating'];
      apiLink = 'rating';
    }
    let indexId = headers.indexOf(field[0]);
    let indexTitle = headers.indexOf(field[1]);
    for(let i = 1; i < array.length-1; i++){ 
      let raw = array[i].split(delimiter);
        result.push({[field[0]]:parseInt(raw[indexId]), [field[1]]:raw[indexTitle]});      
    }
    let chunckData=[];
    for(let chunck = 0; chunck<result.length; chunck++){
      chunckData.push(result[chunck]);
      if(chunck%10000==0||chunck==result.length-1){
        let strRating = await this.http.post('http://localhost:3000/'+apiLink,chunckData).toPromise();
        chunckData=[];
      }
    }
    console.log('data send');

  }
}
