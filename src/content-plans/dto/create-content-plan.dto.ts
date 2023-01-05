import { IsNotEmpty, MinLength } from 'class-validator';
import { IsContentPlansAlreadyExist } from '../schemas/content-plans.validate';

export class CreateContentPlanDto {
  @IsNotEmpty({
      message: 'Name should not be empty'
  })
  @MinLength(3, {
    message: 'Name is too short, mininal length is $constraint1'
  })
  @IsContentPlansAlreadyExist({
    message: '$value already exists. Choose another name.'
  })
  name: String;

  @IsNotEmpty({
    message: 'Price should not be empty'
  })
  price: Number;

  @IsNotEmpty({
    message: 'Number of articles should not be empty'
  })
  number_of_articles: String;
}
