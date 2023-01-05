import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFacebookPlanDto } from './dto/create-facebook-plan.dto';
import { UpdateFacebookPlanDto } from './dto/update-facebook-plan.dto';
import { FacebookPlans, FacebookPlansDocument } from './schemas/facebook-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class FacebookPlansService {
  constructor(
    @InjectModel(FacebookPlans.name) public model: Model<FacebookPlansDocument>
  ) {};

  async create(createFacebookPlanDto: CreateFacebookPlanDto) {
    const model = new this.model(createFacebookPlanDto);
    return await model.save();
  }

  async findAll(_page: any) {
    var model = await new MongooseHelper(this.model)
      .sort('createdAt', -1)
      .paging(_page, 10)
      .excute();
    
    return model;
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async update(id: string, updateFacebookPlanDto: UpdateFacebookPlanDto) {
    const checkExisted = await this.model.find({'name': updateFacebookPlanDto.name}).count();
    if (checkExisted >= 2) return null;
    const model = await this.model
      .findByIdAndUpdate(id, updateFacebookPlanDto)
      .setOptions({ new: true });
      
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  async remove(id: string) {
    const model = await this.model.findByIdAndDelete(id);
    if (!model) {
      throw new NotFoundException();
    }
    return 'Delete success';
  }

  async findByName(name: string) {
    const model = await this.model.findOne({name: name});
    return model;
  }

  async static(){
    var data = {};
    //Total
    var model = await this.model.find().count();
    data['total'] = model;
    return data;
  }
}
