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
 //   await this.getFile('Rating')
 //   await this.getFile('InfoMovie')
    /*
    let fileInfo = await this.download.readAllLine('Rating').toPromise();//fs.readFileSync('C:\\WRK\\nestjs\\film-collection\\movies_metadata.csv'); 
    let arrayInfo = fileInfo.data.toString().split("\n");
    let resultInfo = [];
    let headers = arrayInfo[0].split(",");
    let indexId = headers.indexOf('id');
    let indexTitle = headers.indexOf('original_title');
    console.log(headers[0]);
    for(let i = 1; i < arrayInfo.length-1; i++){   
      let raw = arrayInfo[i].split(/,\"|\",|,(?! )/);
        resultInfo.push({id:parseInt(raw[indexId]), original_title:raw[indexTitle]});      
    }
    let str = await this.http.post('http://localhost:3000/infofilms',resultInfo).toPromise()
    */
   // let info = this.download.readAllLine('InfoMovie').toPromise();

    /*
     let fileRating = fs.readFileSync('C:\\WRK\\nestjs\\film-collection\\ratings.csv');
     let arrayRating = fileRating.toString().split("\n");
     let resultRating = [];
     let headersRating = arrayRating[0].split(",");
     let indexMovieId = headersRating.indexOf('movieId');
     let indexRating = headersRating.indexOf('rating');
     for(let i = 1; i < arrayRating.length-1; i++){   
       let raw = arrayRating[i].split(',');
         resultRating.push({moveId:parseInt(raw[indexMovieId]), rating:raw[indexRating]});      
     }
     let strRating = this.http.post('http://localhost:3000/rating',resultRating).subscribe(x=>console.log('rating create'))
     */

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
    let strRating = await this.http.post('http://localhost:3000/'+apiLink,result).toPromise();
  }
}
