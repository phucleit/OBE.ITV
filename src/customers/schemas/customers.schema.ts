import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type CustomersDocument = Customers & Document;

export enum CustomersStatus {
    OK, BAD, NOTEXIST
}

export enum CustomerType {
    PERSON,COMPANY,VIP
}

@Schema({ timestamps: true })
export class Customers {
    @Prop({type: String, required: true})
    fullname: String;

    @Prop({type: String, required: false})
    gender: String;

    @Prop({type: String, required: true})
    phone: String;

    @Prop({type: String, required: false})
    customer_type: String;

    @Prop({type: Number, required: false})
    type: String;

    @Prop({type: String, required: false})
    email: String;

    @Prop({type: Date, required: false})
    birthDay: Date;

    @Prop({type: String, required: false})
    address: String;

    @Prop({type: String, required: true})
    cmnd: String;

    @Prop({type: String, required: false})
    image_front_cmnd: String;

    @Prop({type: String, required: false})
    image_backside_cmnd: String;

    @Prop({type: String, required: false})
    mst: String;

    @Prop({type: String, required: false})
    note: String;
}

export const CustomersSchema = SchemaFactory.createForClass(Customers);