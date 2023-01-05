import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailPlansService } from './email-plans.service';
import { EmailPlansController } from './email-plans.controller';
import { EmailPlans, EmailPlansSchema } from './schemas/email-plans.schema';
import { IsEmailPlansAlreadyExistConstraint } from './schemas/email-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug');

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: EmailPlans.name,
        useFactory: () => {
          const schema = EmailPlansSchema;
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
  controllers: [EmailPlansController],
  providers: [IsEmailPlansAlreadyExistConstraint, EmailPlansService,CaslAbilityFactory],
  exports: [EmailPlansService]
})
export class EmailPlansModule {}
