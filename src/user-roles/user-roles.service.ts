import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MongooseHelper } from 'src/common/MongooseHelper';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole, UserRoleDocument, UserRoleStatus,Modules } from './schemas/userRole.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole.name) public model: Model<UserRoleDocument>,
    public userService: UserService
  ) {};

  async create(createUserRoleDto: CreateUserRoleDto) {
    const model = new this.model (createUserRoleDto);
    model.status = UserRoleStatus.OK;
    await model.save();
    for await(const u of createUserRoleDto['users']){
      var user = await this.userService.findOne(u);
      if(user){
        await this.userService.updateRole(u,model.id);
      }
    }
    return model;
  }

  async findAll() {
    return await this.model.find();
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    var res = await this.userService.findWithRole(model._id);
    model = JSON.parse(JSON.stringify(model));
    model["users"] = res.map(p=> p._id);
    return model;
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    console.log(updateUserRoleDto)
    const model = await this.model
      .findByIdAndUpdate(id, updateUserRoleDto)
      .setOptions({ new: true });
    for await(const u of updateUserRoleDto['users']){
      var user = await this.userService.findOne(u);
      if(user){
        await this.userService.updateRole(u,model.id);
      }
    }  
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  async remove(id: string) {
    let res = await this.model.findByIdAndDelete(new Types.ObjectId(id));
    return res;
  }

  async removeUser(id: string, userid: string){
    console.log(id,userid)
    var user = await this.userService.findOne(userid);
    user.role = null;
    await user.save();
    return user;
  }

  allModule(){
    return Object.values(Modules).splice(0,Object.values(Modules).length/2);
  }

  async static(){
    var data = {};
    //Total
    var model = await this.model.find().count();
    data['total'] = model;
    return data;
  }
}
