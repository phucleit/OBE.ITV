import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EmailPlansDocument = EmailPlans & Document;

export enum EmailPlansStatus {
  OK, BAD, NOTEXIST
}

@Schema({ timestamps: true })
export class EmailPlans {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: String, required: true})
    capacity: String;

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({type: Number, required: true})
    sell_price: Number;
}

export const EmailPlansSchema = SchemaFactory.createForClass(EmailPlans);