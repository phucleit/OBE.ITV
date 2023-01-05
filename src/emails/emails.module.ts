import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { Emails, EmailsSchema } from './schemas/emails.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Emails.name,
        useFactory: () => {
          const schema = EmailsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [EmailsController],
  providers: [EmailsService,CaslAbilityFactory],
  exports: [EmailsService]
})
export class EmailsModule {}
