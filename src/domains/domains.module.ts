import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { Domains, DomainsSchema } from './schemas/domains.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Domains.name,
        useFactory: () => {
          const schema = DomainsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [DomainsController],
  providers: [DomainsService,CaslAbilityFactory],
  exports: [DomainsService]
})
export class DomainsModule {}
