import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
// import { ObjectId } from 'mongoose';

export class UpdateContractDto extends PartialType(CreateContractDto) {}
// export class UpdateContractDto {
//   code: String;
//   customer: ObjectId;
//   domain: ObjectId[];
//   hosting: ObjectId;
//   ssl: ObjectId;
//   email: ObjectId;
//   google: ObjectId;
//   facebook: ObjectId;
//   content: ObjectId;
//   maintenance: ObjectId;
//   price: Number;
//   startedAt: Date;
// }
