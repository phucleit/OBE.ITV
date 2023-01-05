import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDomainPlanDto } from './dto/create-domain-plan.dto';
import { UpdateDomainPlanDto } from './dto/update-domain-plan.dto';
import { DomainPlans, DomainPlansDocument } from './schemas/domain-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class DomainPlansService {
  constructor(
    @InjectModel(DomainPlans.name) public model: Model<DomainPlansDocument>
  ) {};

  async create(createDomainPlanDto: CreateDomainPlanDto) {
    try {
      const model = new this.model(createDomainPlanDto);
      return await model.save();
    } catch {
      return null;
    }
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

  async update(id: string, updateDomainPlanDto: UpdateDomainPlanDto) {
    const checkExisted = await this.model.find({'name': updateDomainPlanDto.name}).count();
    if(checkExisted >= 2) return null
    const model = await this.model
      .findByIdAndUpdate(id, updateDomainPlanDto)
      .setOptions({ new: true });

    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  async remove(id: string) {
    var model = await this.model.findByIdAndDelete(id);
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
    try {
      var data = {};
      var model = await this.model.find().count();
      data['total'] = model;
      return data;

    } catch {
      throw new NotFoundException();
    }
  }
}
