import { IsEmail, IsNotEmpty,MinLength,MaxLength, ValidationArguments } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4, {
        message: 'Username is too short, mininal length is $constraint1'
    })
    @MaxLength(20, {
        message: 'Username is too long, maxinimal length is $constraint2 characters, but actual is $value',
    })
    username : String;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password is too short'})
    password : String;

    phone: String;

    address: String;

    sex: String;
    
    cmd: String;
    
    @IsNotEmpty()
    @IsEmail({message: 'hello'})
    email: String;

    status: Object;
    //@IsDate({message: 'hello'})
    birthDay: Date
}
