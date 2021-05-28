import { HttpModule, HttpService, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfofilmsController } from './infofilms/infofilms.controller';
import { RatingController } from './rating/rating.controller';
import { InfoMovie, InfoMovieSchema } from './Schema/info-movie';
import { Rating, RatingSchema } from './Schema/rating';
import { DownloadFileService } from './services/download-file/download-file.service';
import { InfomovieService } from './services/infomovie/infomovie.service';
import { RatingService } from './services/rating/rating.service';

@Module({
    imports:[MongooseModule.forFeature([{name:InfoMovie.name, schema:InfoMovieSchema},{name:Rating.name, schema:RatingSchema}]),
HttpModule],
    controllers:[InfofilmsController,RatingController],
    providers:[InfomovieService, DownloadFileService, RatingService]
})
export class FilmsModule {}
