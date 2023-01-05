import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as MongooseSchema } from 'mongoose';
import { UserRole } from 'src/user-roles/schemas/userRole.schema';
export type UserDocument = User & Document;

export enum UserStatus {
  OK,BAD,NOTEXIST
}

@Schema()
export class User {
  @Prop({type: Number})
  id: Number;

  @Prop({required:true})
  username: string;

  @Prop({require:true, type: String})
  password: String;

  @Prop({require: true})
  email: String;
  
  @Prop({type: Number})
  status: Number;

  @Prop({type: Boolean})
  isAdmin: Boolean;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'UserRole', required: false, autopopulate: true})
  role: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);