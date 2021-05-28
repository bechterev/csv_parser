import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {InfoMovie} from '../Schema/info-movie';
import * as mongoose from 'mongoose';
export type RatingDocument = Rating & Document

@Schema()
export class Rating {
    @Prop()
    moveId: number

    @Prop()
    rating: number


}
export const RatingSchema = SchemaFactory.createForClass(Rating);
