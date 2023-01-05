import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRolesService  } from './user-roles.service'
import { UserRolesController } from './user-roles.controller';
import { UserRole, UserRoleSchema } from './schemas/userRole.schema';
import { CaslModule } from 'src/casl/casl.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: UserRole.name,
          useFactory: () => {
            const schema = UserRoleSchema;
            schema.plugin(require('mongoose-autopopulate'));
            return schema;
          },
        }
      ]
    ),
    UserModule
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService, CaslAbilityFactory],
  exports: [UserRolesService]
})
export class UserRolesModule {}
