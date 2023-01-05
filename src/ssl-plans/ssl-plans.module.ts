import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SslPlansService } from './ssl-plans.service';
import { SslPlansController } from './ssl-plans.controller';
import { SslPlans, SslPlansSchema } from './schemas/ssl-plans.schema';
import { IsSslPlansAlreadyExistConstraint } from './schemas/ssl-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: SslPlans.name,
        useFactory: () => {
          const schema = SslPlansSchema;
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
  controllers: [SslPlansController],
  providers: [IsSslPlansAlreadyExistConstraint, SslPlansService,CaslAbilityFactory],
  exports: [SslPlansService]
})
export class SslPlansModule {}
