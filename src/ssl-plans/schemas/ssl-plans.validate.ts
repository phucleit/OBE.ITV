import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { SslPlansService } from '../ssl-plans.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsSslPlansAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(private sslPlans: SslPlansService) {}

  async validate(str: any, args: ValidationArguments) {
    var model = await this.sslPlans.findByName(str);
    if(model == null) return true;
    return false;
  }
}

export function IsSslPlansAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSslPlansAlreadyExistConstraint,
    });
  }
}