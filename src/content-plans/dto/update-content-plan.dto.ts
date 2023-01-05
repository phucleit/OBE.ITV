import { PartialType } from '@nestjs/mapped-types';
import { CreateContentPlanDto } from './create-content-plan.dto';

// export class UpdateContentPlanDto extends PartialType(CreateContentPlanDto) {}
export class UpdateContentPlanDto {
  name: String;
  price: Number;
  number_of_articles: String;
}
