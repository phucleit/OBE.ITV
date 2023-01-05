import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailPlanDto } from './create-email-plan.dto';

// export class UpdateEmailPlanDto extends PartialType(CreateEmailPlanDto) {}
export class UpdateEmailPlanDto {
  name: String;
  capacity: String;
  price: Number;
  sell_price: Number;
}
