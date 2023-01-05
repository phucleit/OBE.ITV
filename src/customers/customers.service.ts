import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customers, CustomersDocument } from './schemas/customers.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers.name) public model: Model<CustomersDocument>
  ) {};

  async create(createCustomerDto: CreateCustomerDto) {
    var model = new this.model(createCustomerDto);
    return await model.save();
  }

  async findAll(_page: any, search?: string) {
    var filter = {};
    if(!search) {
      filter = {$match: {}};
    }
    else {
      filter ={ $match: {
        $text: {
          $search: search??""
        }
      }};
    }

    var model = await new MongooseHelper(this.model)
      .query(filter)
      .sort('createdAt', -1)
      .paging(_page, 10)
      .excute();
    return model;
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const model = await this.model
      .findByIdAndUpdate(id, updateCustomerDto)
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

  async findPersonalType(_page: any) {
    try {
      var filter = {};

      filter ={ $match: {
        'customer_type': 'personal',
      }};

      var model = await new MongooseHelper(this.model)
        .query(filter)
        .sort('createdAt', -1)
        .paging(_page, 10)
        .excute();
      return model;
    } catch {
      throw new NotFoundException();
    }
  }

  async findCompanyType(_page: any) {
    try {
      var filter = {};

      filter ={ $match: {
        'customer_type': 'company',
      }};

      var model = await new MongooseHelper(this.model)
        .query(filter)
        .sort('createdAt', -1)
        .paging(_page, 10)
        .excute();
      return model;
    } catch {
      throw new NotFoundException();
    }
  }

  async findFriendlyType(_page: any) {
    try {
      var filter = {};

      filter ={ $match: {
        'customer_type': 'friendly',
      }};

      var model = await new MongooseHelper(this.model)
        .query(filter)
        .sort('createdAt', -1)
        .paging(_page, 10)
        .excute();
      return model;
    } catch {
      throw new NotFoundException();
    }
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

  async staticService(_page: any) {
    try {
      var model = await new MongooseHelper(this.model)
        .sort('createdAt', -1)
        .paging(_page, 3)
        .excute();

      model.data.map(item => {
        console.log(item._id);
      })
    } catch {
      throw new NotFoundException();
    }
  }
}
