import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { Contracts, ContractsSchema } from './schemas/contracts.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug');

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Contracts.name,
        useFactory: () => {
          const schema = ContractsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [ContractsController],
  providers: [ContractsService,CaslAbilityFactory],
  exports: [ContractsService]
})
export class ContractsModule {}
