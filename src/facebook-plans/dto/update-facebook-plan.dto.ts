import { PartialType } from '@nestjs/mapped-types';
import { CreateFacebookPlanDto } from './create-facebook-plan.dto';

// export class UpdateFacebookPlanDto extends PartialType(CreateFacebookPlanDto) {}
export class UpdateFacebookPlanDto {
  name: String;
  price: Number;
  service_charge: Number;
  note: String;
}
