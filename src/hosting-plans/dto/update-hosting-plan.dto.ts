import { PartialType } from '@nestjs/mapped-types';
import { CreateHostingPlanDto } from './create-hosting-plan.dto';

// export class UpdateHostingPlanDto extends PartialType(CreateHostingPlanDto) {}
export class UpdateHostingPlanDto {
  name: String;
  capacity: String;
  price: Number;
  sell_price: Number;
}
