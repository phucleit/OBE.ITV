import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHostingPlanDto } from './dto/create-hosting-plan.dto';
import { UpdateHostingPlanDto } from './dto/update-hosting-plan.dto';
import { HostingPlans, HostingPlansDocument } from './schemas/hosting-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class HostingPlansService {
  constructor(
    @InjectModel(HostingPlans.name) public model: Model<HostingPlansDocument>
  ) {};

  async create(createHostingPlanDto: CreateHostingPlanDto) {
    const model = new this.model(createHostingPlanDto);
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

  async update(id: string, updateHostingPlanDto: UpdateHostingPlanDto) {
    const checkExisted = await this.model.find({'name': updateHostingPlanDto.name}).count();
    if (checkExisted >= 2) return null;
    const model = await this.model
      .findByIdAndUpdate(id, updateHostingPlanDto)
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
