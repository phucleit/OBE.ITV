import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GooglesService } from './googles.service';
import { GooglesController } from './googles.controller';
import { Googles, GooglesSchema } from './schemas/googles.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Googles.name,
        useFactory: () => {
          const schema = GooglesSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [GooglesController],
  providers: [GooglesService,CaslAbilityFactory],
  exports: [GooglesService]
})
export class GooglesModule {}
