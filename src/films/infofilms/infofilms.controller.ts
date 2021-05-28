import { Controller, Get, Post, HttpCode, HttpStatus, Body, Header } from '@nestjs/common';
import { InfoMovie } from '../Schema/info-movie';
import {CreateInfoMovieDto} from '../dto/create-info-movie';
import {InfomovieService} from '../services/infomovie/infomovie.service';

@Controller('infofilms')
export class InfofilmsController {
    constructor(private readonly infoMovieService: InfomovieService){

    }
    @Get()
    getAll(): Promise<InfoMovie[]> {
      return this.infoMovieService.getAll()
    }
  /*
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control','none')
    create(@Body() createInfoMovieDto: CreateInfoMovieDto):Promise<InfoMovie>{
        return this.infoMovieService.create(createInfoMovieDto);
    }
    */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control','none')
    createMany(@Body() createInfoMovieDto: CreateInfoMovieDto[]):Promise<Array<InfoMovie>>{
      return this.infoMovieService.createMany(createInfoMovieDto);
  }
}
