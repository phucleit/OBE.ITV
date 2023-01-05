import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customers, CustomersSchema } from './schemas/customers.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Customers.name,
        useFactory: () => {
          const schema = CustomersSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            this["slug"] = slugify(this["fullname"]) 
          });
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService,CaslAbilityFactory],
  exports: [CustomersService]
})
export class CustomersModule {}
