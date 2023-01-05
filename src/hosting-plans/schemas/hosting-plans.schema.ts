import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HostingPlansDocument = HostingPlans & Document;

export enum HostingPlansStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class HostingPlans {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: String, required: true})
    capacity: String;

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({type: Number, required: true})
    sell_price: Number;
}

export const HostingPlansSchema = SchemaFactory.createForClass(HostingPlans);