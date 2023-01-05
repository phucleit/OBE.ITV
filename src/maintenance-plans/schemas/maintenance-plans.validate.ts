import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { MaintenancePlansService } from '../maintenance-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsMaintenancePlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private maintenancePlans: MaintenancePlansService) {}

  async validate(str: any, args: ValidationArguments) {
    var model = await this.maintenancePlans.findByName(str);
    if(model == null) return true;
    return false;
  }
}

export function IsMaintenancePlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsMaintenancePlansAlreadyExistConstraint,
        });
  }
}