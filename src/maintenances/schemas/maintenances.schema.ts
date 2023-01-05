import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type MaintenancesDocument = Maintenances & Document;

export enum MaintenancesStatus {
  OK,BAD,NOTEXIST,EXPIRED,NEAR_EXPIRED
}

@Schema({ timestamps: true })
export class Maintenances {
  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'MaintenancePlans', required: true, autopopulate: true})
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

export const MaintenancesSchema = SchemaFactory.createForClass(Maintenances);