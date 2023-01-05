import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type ContractsDocument = Contracts & Document;

export enum ContractsStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class Contracts {
  @Prop({type: String, required: true})
  code: String;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Customers', required: false, autopopulate: true})
  customer_id: MongooseSchema.Types.ObjectId;

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Domains', required: false, autopopulate: true})
  domain_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Hostings', required: false, autopopulate: true})
  hosting_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Ssls', required: false, autopopulate: true})
  ssl_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Emails', required: false, autopopulate: true})
  email_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Googles', required: false, autopopulate: true})
  google_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Facebooks', required: false, autopopulate: true})
  facebook_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Contents', required: false, autopopulate: true})
  content_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'Maintenances', required: false, autopopulate: true})
  maintenance_id: [MongooseSchema.Types.ObjectId];

  @Prop({type: Number, required: false})
  price: Number;

  @Prop({type: Date, required: true})
  startedAt: Date;
}

export const ContractsSchema = SchemaFactory.createForClass(Contracts);