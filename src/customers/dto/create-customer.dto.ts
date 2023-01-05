import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty({
        message: 'FullName should not be empty'
    })
    @MinLength(3, {
        message: 'FullName is too short, mininal length is $constraint1'
    })
    fullname: String;

    gender: String;
    
    @IsNotEmpty({
        message: 'Phone should not be empty'
    })
    phone: String;

    customer_type: String;

    type: Number;

    email: String;

    birthDay: Date;

    address: String;

    @IsNotEmpty({
        message: 'Cmnd should not be empty'
    })
    cmnd: String;

    image_front_cmnd: String;

    image_backside_cmnd: String;
}
