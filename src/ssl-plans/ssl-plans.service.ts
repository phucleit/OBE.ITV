import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSslPlanDto } from './dto/create-ssl-plan.dto';
import { UpdateSslPlanDto } from './dto/update-ssl-plan.dto';
import { SslPlans, SslPlansDocument } from './schemas/ssl-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper'

@Injectable()
export class SslPlansService {
  constructor(
    @InjectModel(SslPlans.name) public model: Model<SslPlansDocument>
  ) {};

  async create(createSslPlanDto: CreateSslPlanDto) {
    const model = new this.model(createSslPlanDto);
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

  async update(id: string, updateSslPlanDto: UpdateSslPlanDto) {
    const checkExisted = await this.model.find({'name': updateSslPlanDto.name}).count();
    if(checkExisted >= 2) return null
    var model = await this.model
      .findByIdAndUpdate(id, updateSslPlanDto)
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
