import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { GooglePlansService } from '../google-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsGooglePlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private googlePlans: GooglePlansService) {}

  async validate(str: any, args: ValidationArguments) {
      var model = await this.googlePlans.findByName(str);
      if(model == null) return true;
      return false;
  }
}

export function IsGooglePlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
      registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsGooglePlansAlreadyExistConstraint,
        });
  }
}