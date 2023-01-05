import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentPlansService } from './content-plans.service';
import { ContentPlansController } from './content-plans.controller';
import { ContentPlans, ContentPlansSchema } from './schemas/content-plans.schema';
import { IsContentPlansAlreadyExistConstraint } from './schemas/content-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug');

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: ContentPlans.name,
        useFactory: () => {
          const schema = ContentPlansSchema;
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
  controllers: [ContentPlansController],
  providers: [IsContentPlansAlreadyExistConstraint, ContentPlansService,CaslAbilityFactory],
  exports: [ContentPlansService]
})
export class ContentPlansModule {}
