import { PartialType } from '@nestjs/mapped-types';
import { CreateSslPlanDto } from './create-ssl-plan.dto';

// export class UpdateSslPlanDto extends PartialType(CreateSslPlanDto) {}
export class UpdateSslPlanDto {
  name: String;
  price: Number;
  sell_price: Number;
}
