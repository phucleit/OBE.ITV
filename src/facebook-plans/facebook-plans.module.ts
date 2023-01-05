import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacebookPlansService } from './facebook-plans.service';
import { FacebookPlansController } from './facebook-plans.controller';
import { FacebookPlans, FacebookPlansSchema } from './schemas/facebook-plans.schema';
import { IsFacebookPlansAlreadyExistConstraint } from './schemas/facebook-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug');

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: FacebookPlans.name,
        useFactory: () => {
          const schema = FacebookPlansSchema;
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
  controllers: [FacebookPlansController],
  providers: [IsFacebookPlansAlreadyExistConstraint, FacebookPlansService,CaslAbilityFactory],
  exports: [FacebookPlansService]
})
export class FacebookPlansModule {}
