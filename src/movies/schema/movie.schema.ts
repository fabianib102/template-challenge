import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Movie {

    @Prop()
    title: string;

    @Prop()
    plot: string;

    @Prop()
    year: number;
    
}

export const MovieSchema = SchemaFactory.createForClass(Movie)