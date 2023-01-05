import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRoleDocument = UserRole & Document;

export enum UserRoleStatus {
  OK,BAD,NOTEXIST
}

export enum Modules {
   User , 
   UserRole , 
   Domains ,
   DomainPlans ,
   Hostings ,
   HostingPlans ,
   Contracts ,
   Customers ,
   Emails ,
   EmailPlans ,
   Facebooks ,
   FacebookPlans ,
   Googles ,
   GooglePlans ,
   Maintenances ,
   MaintenancePlans ,
   Contents ,
   ContentPlans ,
   Ssls ,
   SslPlans
}

@Schema()
export class UserRole {
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  description: string;

  @Prop({type: Number})
  status: Number;

  @Prop({type: [Object]})
  modules: [Object];
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);