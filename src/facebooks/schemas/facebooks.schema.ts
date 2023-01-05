import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type FacebooksDocument = Facebooks & Document;

export enum FacebooksStatus {
  OK,BAD,NOTEXIST,EXPIRED,NEAR_EXPIRED
}

@Schema({ timestamps: true })
export class Facebooks {
  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'FacebookPlans', required: true, autopopulate: true})
  plan: MongooseSchema.Types.ObjectId;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Customers', required: true, autopopulate: true})
  customer: MongooseSchema.Types.ObjectId;
  
  @Prop({type: Number, required: false})
  status: Number;

  @Prop({type: Date, required: true})
  startedAt: Date;

  @Prop({type: Date, required: true})
  expiredAt: Date;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Contracts', required: false, autopopulate: true})
  contract_id: MongooseSchema.Types.ObjectId;
}

export const FacebooksSchema = SchemaFactory.createForClass(Facebooks);