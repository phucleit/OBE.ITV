import { PartialType } from '@nestjs/mapped-types';
import { CreateGooglePlanDto } from './create-google-plan.dto';

// export class UpdateGooglePlanDto extends PartialType(CreateGooglePlanDto) {}
export class UpdateGooglePlanDto {
  name: String;
  price: Number;
  service_charge: Number;
}