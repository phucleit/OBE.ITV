import { IsNotEmpty, MinLength } from 'class-validator';
import { IsSslPlansAlreadyExist } from '../schemas/ssl-plans.validate';

export class CreateSslPlanDto {
  @IsNotEmpty({
    message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsSslPlansAlreadyExist({
    message: '$value already exists. Choose another name.'
  })
  name: String;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  price: Number;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  sell_price: Number;
}
