import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainPlansService } from './domain-plans.service';
import { DomainPlansController } from './domain-plans.controller';
import { DomainPlans, DomainPlansSchema } from './schemas/domain-plans.schema';
import { IsDomainPlansAlreadyExistConstraint } from './schemas/domain-plans.validate';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: DomainPlans.name,
        useFactory: () => {
          const schema = DomainPlansSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [DomainPlansController],
  providers: [IsDomainPlansAlreadyExistConstraint, DomainPlansService,CaslAbilityFactory],
  exports: [DomainPlansService]
})
export class DomainPlansModule {}
