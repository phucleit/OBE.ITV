import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { HostingPlansService } from '../hosting-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsHostingPlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private hostingPlans: HostingPlansService) {}

  async validate(str: any, args: ValidationArguments) {
      var model = await this.hostingPlans.findByName(str);
      if(model == null) return true;
      return false;
  }
}

export function IsHostingPlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsHostingPlansAlreadyExistConstraint,
        });
  }
}