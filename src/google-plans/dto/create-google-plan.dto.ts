import { IsNotEmpty, MinLength, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { IsGooglePlansAlreadyExist } from '../schemas/google-plans.validate';

export class CreateGooglePlanDto {
  @IsNotEmpty({
    message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsGooglePlansAlreadyExist({
    message: '$value already exists. Choose another name.'
  })
  name: String;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  price: Number;

  service_charge: Number;
}
