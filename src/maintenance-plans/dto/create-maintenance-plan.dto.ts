import { IsNotEmpty, MinLength, IsNumber, IsPositive } from 'class-validator';
import { IsMaintenancePlansAlreadyExist } from '../schemas/maintenance-plans.validate';

export class CreateMaintenancePlanDto {
  @IsNotEmpty({
    message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsMaintenancePlansAlreadyExist({
    message: '$value already exists. Choose another name.'
  })
  name: String;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  price: Number;

  note: String;
}
