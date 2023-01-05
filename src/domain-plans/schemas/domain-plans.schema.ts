import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type DomainPlansDocument = DomainPlans & Document;

export enum DomainPlansStatus {
    OK, BAD, NOTEXIST
}

@Schema({ timestamps: true })
export class DomainPlans {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({type: Number, required: true})
    sell_price: Number;
}

export const DomainPlansSchema = SchemaFactory.createForClass(DomainPlans);