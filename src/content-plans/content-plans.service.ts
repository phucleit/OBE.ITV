import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContentPlanDto } from './dto/create-content-plan.dto';
import { UpdateContentPlanDto } from './dto/update-content-plan.dto';
import { ContentPlans, ContentPlansDocument } from './schemas/content-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class ContentPlansService {
  constructor(
    @InjectModel(ContentPlans.name) public model: Model<ContentPlansDocument>
  ) {};

  async create(createContentPlanDto: CreateContentPlanDto) {
    const model = new this.model(createContentPlanDto);
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

  async update(id: string, updateContentPlanDto: UpdateContentPlanDto) {
    const checkExisted = await this.model.find({'name': updateContentPlanDto.name}).count();
    if (checkExisted >= 2) return null;
    const model = await this.model
      .findByIdAndUpdate(id, updateContentPlanDto)
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
