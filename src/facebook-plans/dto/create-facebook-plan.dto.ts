import { IsNotEmpty, MinLength } from 'class-validator';
import { IsFacebookPlansAlreadyExist } from '../schemas/facebook-plans.validate';

export class CreateFacebookPlanDto {
  @IsNotEmpty({
    message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsFacebookPlansAlreadyExist({
    message: '$value already exists. Choose another name.'
  })
  name: String;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  price: Number;

  service_charge: Number;

  note: String;
}
