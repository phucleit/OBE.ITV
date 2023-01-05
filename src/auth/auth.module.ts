import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { User,UserSchema } from './../user/schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  providers: [AuthService, LocalStrategy,JwtStrategy],
  imports: [
    MongooseModule.forFeature([{name:User.name, schema: UserSchema}]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
