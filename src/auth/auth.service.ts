import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserStatus } from './../user/schemas/user.schema';
@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) public userModel: Model<UserDocument>
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    var user = await this.userService.findOne(username);
    if(user && user.password == pass) {
        const { password, ...result } = user;
        return result;
    }
    return null;
  }

  async login(user: any) {
    var data = await this.userModel.findOne({username: user.username});
    const payload = {username:data.username,isAdmin:data.isAdmin}
    return {
      access_token: this.jwtService.sign(payload),
      user: data
    };
  }
}