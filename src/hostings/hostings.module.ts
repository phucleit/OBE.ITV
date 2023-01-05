import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostingsService } from './hostings.service';
import { HostingsController } from './hostings.controller';
import { Hostings, HostingsSchema } from './schemas/hostings.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
import { CaslModule } from 'src/casl/casl.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Hostings.name,
        useFactory: () => {
          const schema = HostingsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule,CaslModule
  ],
  controllers: [HostingsController],
  providers: [HostingsService,CaslAbilityFactory],
  exports: [HostingsService]
})
export class HostingsModule {}
