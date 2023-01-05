import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose'
import { Model } from 'mongoose';
import { User, UserDocument, UserStatus } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public model: Model<UserDocument>) {};

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.model(createUserDto);
    user.status = UserStatus.OK;
    return await user.save();
  }
  
  async findAll() {
    var x = await this.model.find()
    return x;
  }

  async findByUserName(username: string){
    console.log(username,"???");
    let res = await this.model.findOne({username: username}).exec();
    return res;
  }

  async findWithRole(role: string){
    return await this.model.find({role: new Types.ObjectId(role)}).exec();
  }

  async initAdmin(){
    var x = await this.model.findOne({username: 'admin'}).exec();
    if(x) return UserStatus.NOTEXIST;
    else {
      var model = new this.model({
        username: 'admin',
        password: '123asd',
        email:'admin@gmail.com',
        isAdmin: true,
      })
      await model.save();
      return model
    }
  }

  async insert() {

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const model = await this.model
      .findByIdAndUpdate(id, updateUserDto)
      .setOptions({ new: true });
      
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  async updateRole(id: string, role: string){
    return await this.model.findByIdAndUpdate(id, {role: role}).exec();
  }

  async remove(id: string) {
    const model = await this.model.findByIdAndDelete(id);
    if (!model) {
      throw new NotFoundException();
    }
    return 'Delete success';
  }

  async static(){
    var data = {};
    //Total
    var model = await this.model.find().count();
    data['total'] = model;
    return data;
  }
}
