import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostingPlansService } from './hosting-plans.service';
import { HostingPlansController } from './hosting-plans.controller';
import { HostingPlans, HostingPlansSchema } from './schemas/hosting-plans.schema';
import { IsHostingPlansAlreadyExistConstraint } from './schemas/hosting-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: HostingPlans.name,
        useFactory: () => {
          const schema = HostingPlansSchema;
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
  controllers: [HostingPlansController],
  providers: [IsHostingPlansAlreadyExistConstraint, HostingPlansService,CaslAbilityFactory],
  exports: [HostingPlansService]
})
export class HostingPlansModule {}
