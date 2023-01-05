import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenancesService } from './maintenances.service';
import { MaintenancesController } from './maintenances.controller';
import { Maintenances, MaintenancesSchema } from './schemas/maintenances.schema';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Maintenances.name,
        useFactory: () => {
          const schema = MaintenancesSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      }
    ]
    ),
    UserModule
  ],
  controllers: [MaintenancesController],
  providers: [MaintenancesService,CaslAbilityFactory],
  exports: [MaintenancesService]
})
export class MaintenancesModule {}
