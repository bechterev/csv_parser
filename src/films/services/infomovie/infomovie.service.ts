import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateInfoMovieDto} from '../../dto/create-info-movie';
import {InfoMovie, InfoMovieDocument} from '../../Schema/info-movie';

@Injectable()
export class InfomovieService {
    constructor(@InjectModel(InfoMovie.name) private infoMovieModel: Model<InfoMovieDocument>){

    }
    async create(InfoMovieDto: CreateInfoMovieDto): Promise<InfoMovie>{
        const newInfoMovie = new this.infoMovieModel(InfoMovieDto)
        return newInfoMovie.save();
    }
    async getAll(): Promise<InfoMovie[]> {
        return this.infoMovieModel.find().exec()
      }
    async createMany(InfoMovieDto: CreateInfoMovieDto[]): Promise<Array<InfoMovie>>{
        const newInfoMovie = this.infoMovieModel.insertMany(InfoMovieDto) 
        return newInfoMovie;
    }
}
