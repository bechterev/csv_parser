import {  HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import {AxiosResponse} from 'axios';
import { response } from 'express';


@Injectable()
export class DownloadFileService {
    constructor(private http:HttpService){

    }

    readAllLine(entity:string):Observable<AxiosResponse<any>>{
        if(entity == 'InfoMovie')
        return this.http.get('http://drive.google.com/uc?id=1qdzHHBdNrCA3pj3aV44WkAJ36sqJU_TS')
        if(entity == 'Rating')
        return this.http.get('http://drive.google.com/uc?id=1RQaeUc1SR7j0S6p5usaavLIoLrpS7wJR')
    }
}
