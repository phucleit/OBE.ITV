import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DomainPlansService } from '../domain-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDomainPlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private domainPlans: DomainPlansService) {}

  async validate(str: any, args: ValidationArguments) {
    var model = await this.domainPlans.findByName(str);
    if(model == null) return true;
    return false;
  }
}

export function IsDomainPlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDomainPlansAlreadyExistConstraint,
    });
  }
}