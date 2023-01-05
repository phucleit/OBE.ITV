import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contracts, ContractsDocument } from './schemas/contracts.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contracts.name) public model: Model<ContractsDocument>
  ) {};

  async create(createContractDto: CreateContractDto) {
    const model = new this.model(createContractDto);
    return await model.save();
  }

  async findAll(_page: any) {
    var model = await new MongooseHelper(this.model)
      .lookup('customer', 'customers')
      .lookup('domain', 'domains')
      .lookup('hosting', 'hostings')
      .lookup('ssl', 'ssls')
      .lookup('email', 'emails')
      .lookup('google', 'googles')
      .lookup('facebook', 'facebooks')
      .lookup('content', 'contents')
      .lookup('maintenance', 'maintenances')
      .sort('createdAt', -1)
      .paging(_page, 10)
      .excute();
    
    return model;
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    // const checkExisted = await this.model.find({'code': updateContractDto.code}).count();
    // if (checkExisted >= 2) return null;
    const model = await this.model
      .findByIdAndUpdate(id, updateContractDto)
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

  async findByCode(code: string) {
    const model = await this.model.findOne({code: code});
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
