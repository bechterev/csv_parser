import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type InfoMovieDocument = InfoMovie & Document

@Schema()
export class InfoMovie {
    @Prop()
    id: number

    @Prop()
    original_title: string
}

export const InfoMovieSchema = SchemaFactory.createForClass(InfoMovie);