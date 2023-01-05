import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContentPlansDocument = ContentPlans & Document;

export enum ContentPlansStatus {
    OK, BAD, NOTEXIST
}

@Schema({ timestamps: true })
export class ContentPlans {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({type: String, required: true})
    number_of_articles: String;
}

export const ContentPlansSchema = SchemaFactory.createForClass(ContentPlans);