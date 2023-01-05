import { IsNotEmpty, MinLength, IsNumber, IsString } from 'class-validator';
import { IsHostingPlansAlreadyExist } from '../schemas/hosting-plans.validate';

export class CreateHostingPlanDto {
  @IsNotEmpty({
    message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsHostingPlansAlreadyExist({
    message: '$value already exists. Choose another name.'
  })
  name: String;

  @IsNotEmpty({
    message: 'Capacity should not be empty'
  })
  @IsString({
    message: 'Capacity is a string'
  })
  capacity: String;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  price: Number;
  
  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  sell_price: Number;
}
