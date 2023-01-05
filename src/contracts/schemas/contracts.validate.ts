// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { ContractsService } from '../contracts.service';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsContractsAlreadyExistConstraint implements ValidatorConstraintInterface {
//   constructor(private contracts: ContractsService) {}

//   async validate(str: any, args: ValidationArguments) {
//     var model = await this.contracts.findByCode(str);
//     if(model == null) return true;
//     return false;
//   }
// }

// export function IsContractsAlreadyExist(validationOptions?: ValidationOptions) {
//   return function(object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsContractsAlreadyExistConstraint,
//     });
//   }
// }