import { IsNotEmpty, MinLength } from 'class-validator';
import { IsDomainPlansAlreadyExist } from '../schemas/domain-plans.validate';

export class CreateDomainPlanDto {
  @IsNotEmpty({
    message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsDomainPlansAlreadyExist({
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
