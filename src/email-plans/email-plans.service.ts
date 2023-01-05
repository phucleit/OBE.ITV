import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmailPlanDto } from './dto/create-email-plan.dto';
import { UpdateEmailPlanDto } from './dto/update-email-plan.dto';
import { EmailPlans, EmailPlansDocument } from './schemas/email-plans.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class EmailPlansService {
  constructor(
    @InjectModel(EmailPlans.name) public model: Model<EmailPlansDocument>
  ) {};

  async create(createEmailPlanDto: CreateEmailPlanDto) {
    const model = new this.model(createEmailPlanDto);
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

  async update(id: string, updateEmailPlanDto: UpdateEmailPlanDto) {
    const checkExisted = await this.model.find({'name': updateEmailPlanDto.name}).count();
    if (checkExisted >= 2) return null;
    const model = await this.model
      .findByIdAndUpdate(id, updateEmailPlanDto)
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
