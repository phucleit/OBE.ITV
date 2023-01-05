import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacebooksService } from './facebooks.service';
import { FacebooksController } from './facebooks.controller';
import { Facebooks, FacebooksSchema } from './schemas/facebooks.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Facebooks.name,
        useFactory: () => {
          const schema = FacebooksSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [FacebooksController],
  providers: [FacebooksService,CaslAbilityFactory],
  exports: [FacebooksService]
})
export class FacebooksModule {}
