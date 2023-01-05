import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FacebookPlansDocument = FacebookPlans & Document;

export enum FacebookPlansStatus {
    OK, BAD, NOTEXIST
}

@Schema({ timestamps: true })
export class FacebookPlans {
  @Prop({type: String, required: true})
  name: String;

  @Prop({type: Number, required: true})
  price: Number;

  @Prop({type: Number, required: false})
  service_charge: Number;

  @Prop({ type: String, required: false })
  note: String;
}

export const FacebookPlansSchema = SchemaFactory.createForClass(FacebookPlans);