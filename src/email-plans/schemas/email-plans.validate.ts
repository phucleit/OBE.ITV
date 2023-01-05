import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EmailPlansService } from '../email-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailPlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private emailPlans: EmailPlansService) {}

  async validate(str: any, args: ValidationArguments) {
      var model = await this.emailPlans.findByName(str);
      if(model == null) return true;
      return false;
  }
}

export function IsEmailPlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsEmailPlansAlreadyExistConstraint,
        });
  }
}