import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenancePlansService } from './maintenance-plans.service';
import { MaintenancePlansController } from './maintenance-plans.controller';
import { MaintenancePlans, MaintenancePlansSchema } from './schemas/maintenance-plans.schema';
import { IsMaintenancePlansAlreadyExistConstraint } from './schemas/maintenance-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: MaintenancePlans.name,
        useFactory: () => {
          const schema = MaintenancePlansSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            this["slug"] = slugify(this["name"]) 
          });
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [MaintenancePlansController],
  providers: [IsMaintenancePlansAlreadyExistConstraint, MaintenancePlansService,CaslAbilityFactory],
  exports: [MaintenancePlansService]
})
export class MaintenancePlansModule {}
