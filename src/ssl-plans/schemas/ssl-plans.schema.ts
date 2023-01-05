import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SslPlansDocument = SslPlans & Document;

export enum SslPlansStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class SslPlans {
  @Prop({type: String, required: true})
  name: String;

  @Prop({type: Number, required: true})
  price: Number;

  @Prop({type: Number, required: true})
  sell_price: Number;
}

export const SslPlansSchema = SchemaFactory.createForClass(SslPlans);