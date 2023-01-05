import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGooglePlanDto } from './dto/create-google-plan.dto';
import { UpdateGooglePlanDto } from './dto/update-google-plan.dto';
import { GooglePlans, GooglePlansDocument } from './schemas/google-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class GooglePlansService {
  constructor(
    @InjectModel(GooglePlans.name) public model: Model<GooglePlansDocument>
  ) {};

  async create(createGooglePlanDto: CreateGooglePlanDto) {
    const model = new this.model(createGooglePlanDto);
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

  async update(id: string, updateGooglePlanDto: UpdateGooglePlanDto) {
    const checkExisted = await this.model.find({'name': updateGooglePlanDto.name}).count();
    if (checkExisted >= 2) return null;
    const model = await this.model
      .findByIdAndUpdate(id, updateGooglePlanDto)
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
