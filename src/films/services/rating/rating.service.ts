import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RatingDocument, Rating } from 'src/films/Schema/rating';
import { Model } from 'mongoose';
import { CreateRatingDto } from '../../dto/create-rating'
import { InfoMovie, InfoMovieSchema } from 'src/films/Schema/info-movie';

@Injectable()
export class RatingService {
    constructor(@InjectModel(Rating.name) private ratingModel: Model<RatingDocument>) {
    }
    async create(RatingDto: CreateRatingDto): Promise<Rating> {
        const newInfoMovie = new this.ratingModel(RatingDto)
        return newInfoMovie.save();
    }
    async createMany(RatingDto: CreateRatingDto[]): Promise<Array<Rating>> {
        const newInfoMovie = this.ratingModel.insertMany(RatingDto)
        return newInfoMovie;
    }
    async getMaxRating(): Promise<Rating[]> {
        return this.ratingModel.aggregate([{
            $sort: {
                rating: -1
            }
        }, { $limit: 10 }, {
            $lookup: {
                from: 'infomovies',
                localField: 'moveId',
                foreignField: 'id',
                as: 'result'
            }
        }, {
            $unwind: {
                path: '$result',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $project: {
                rating: 1, _id:0, "title": "$result.original_title"
            }
        }])
    }
}
