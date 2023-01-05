import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GooglePlansDocument = GooglePlans & Document;

export enum GooglePlansStatus {
  OK, BAD, NOTEXIST
}

@Schema({ timestamps: true })
export class GooglePlans {
  @Prop({type: String, required: true})
  name: String;

  @Prop({type: Number, required: true})
  price: Number;

  @Prop({type: Number, required: false})
  service_charge: Number;
}

export const GooglePlansSchema = SchemaFactory.createForClass(GooglePlans);