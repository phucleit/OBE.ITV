import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SslsService } from './ssls.service';
import { SslsController } from './ssls.controller';
import { Ssls, SslsSchema } from './schemas/ssls.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Ssls.name,
        useFactory: () => {
          const schema = SslsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [SslsController],
  providers: [SslsService,CaslAbilityFactory],
  exports: [SslsService]
})
export class SslsModule {}
