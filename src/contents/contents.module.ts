import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { Contents, ContentsSchema } from './schemas/contents.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Contents.name,
        useFactory: () => {
          const schema = ContentsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [ContentsController],
  providers: [ContentsService,CaslAbilityFactory],
  exports: [ContentsService]
})
export class ContentsModule {}
