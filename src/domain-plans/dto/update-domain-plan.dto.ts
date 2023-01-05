import { PartialType } from '@nestjs/mapped-types';
import { CreateDomainPlanDto } from './create-domain-plan.dto';

// export class UpdateDomainPlanDto extends PartialType(CreateDomainPlanDto) {}
export class UpdateDomainPlanDto {
  name: String;
  price: Number;
  sell_price: Number;
}
