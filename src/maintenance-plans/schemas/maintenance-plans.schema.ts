import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MaintenancePlansDocument = MaintenancePlans & Document;

export enum MaintenancePlansStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class MaintenancePlans {
  @Prop({type: String, required: true})
  name: String;

  @Prop({type: Number, required: true})
  price: Number;

  @Prop({type: String, required: false})
  note: String;
}

export const MaintenancePlansSchema = SchemaFactory.createForClass(MaintenancePlans);