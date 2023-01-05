// import {
//     registerDecorator,
//     ValidationOptions,
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     ValidationArguments,
//   } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { CustomersService } from '../customers.service';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class IsCustomersAlreadyExistConstraint implements ValidatorConstraintInterface {
//     constructor(private customers: CustomersService) {}

//     async validate(str: any, args: ValidationArguments) {
//         var model = await this.customers.findByName(str);
//         if(model == null) return true;
//         return false;
//     }
// }

// export function IsCustomersAlreadyExist(validationOptions?: ValidationOptions) {
//     return function(object: Object, propertyName: string) {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [],
//             validator: IsCustomersAlreadyExistConstraint,
//           });
//     }
// }