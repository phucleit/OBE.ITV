import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User,UserSchema } from './schemas/user.schema'
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService,CaslAbilityFactory],
  exports:[UserService],
})
export class UserModule {}
