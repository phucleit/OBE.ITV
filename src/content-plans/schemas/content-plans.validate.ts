import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ContentPlansService } from '../content-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsContentPlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private contentPlans: ContentPlansService) {}

  async validate(str: any, args: ValidationArguments) {
    var model = await this.contentPlans.findByName(str);
    if(model == null) return true;
    return false;
  }
}

export function IsContentPlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsContentPlansAlreadyExistConstraint,
    });
  }
}