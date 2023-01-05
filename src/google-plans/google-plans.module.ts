import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GooglePlansService } from './google-plans.service';
import { GooglePlansController } from './google-plans.controller';
import { GooglePlans, GooglePlansSchema } from './schemas/google-plans.schema';
import { IsGooglePlansAlreadyExistConstraint } from './schemas/google-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug');

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: GooglePlans.name,
        useFactory: () => {
          const schema = GooglePlansSchema;
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
  controllers: [GooglePlansController],
  providers: [IsGooglePlansAlreadyExistConstraint, GooglePlansService,CaslAbilityFactory],
  exports: [GooglePlansService]
})
export class GooglePlansModule {}
