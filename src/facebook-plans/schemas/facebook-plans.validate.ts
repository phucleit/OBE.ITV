import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { FacebookPlansService } from '../facebook-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsFacebookPlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private facebookPlans: FacebookPlansService) {}

  async validate(str: any, args: ValidationArguments) {
      var model = await this.facebookPlans.findByName(str);
      if(model == null) return true;
      return false;
  }
}

export function IsFacebookPlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsFacebookPlansAlreadyExistConstraint,
        });
  }
}