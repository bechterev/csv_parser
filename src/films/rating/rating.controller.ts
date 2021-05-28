import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateRatingDto } from '../dto/create-rating';
import { Rating } from '../Schema/rating';
import {RatingService} from '../services/rating/rating.service';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService ){}
    @Get()
    getAll(): Promise<Rating[]> {
      return this.ratingService.getMaxRating()
    }
    /*
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control','none')
    create(@Body() createRatingDto: CreateRatingDto):Promise<Rating>{
        return this.ratingService.create(createRatingDto);
    }
    */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control','none')
    createMany(@Body() createRatingDto: CreateRatingDto[]):Promise<Array<Rating>>{
        return this.ratingService.createMany(createRatingDto);
    }

}
