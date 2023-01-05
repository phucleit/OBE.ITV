import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domains, DomainsDocument, DomainsStatus } from './schemas/domains.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';
import * as dayjs from 'dayjs'

@Injectable()
export class DomainsService {
  constructor(
    @InjectModel(Domains.name) public model: Model<DomainsDocument>
  ) {};

  async create(createDomainDto: CreateDomainDto) {
    const model = new this.model(createDomainDto);
    model.status = DomainsStatus.OK;
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
      .lookup('plan', 'domainplans')
      .lookup('customer', 'customers')
      .sort('createdAt', -1)
      .paging(_page, 10)
      .excute();
    return model;
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async update(id: string, updateDomainDto: UpdateDomainDto) {
    const model = await this.model
      .findByIdAndUpdate(id, updateDomainDto)
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

  async findDomainPeriod(_page: any) {
    try {
      var currentDate = new Date();
      var dateExpired = dayjs(currentDate).add(30, 'day');
      var filter = {};

      filter ={ $match: {
        'expiredAt': {
          $gte: dayjs(currentDate).startOf('day').toDate(),
          $lte: dayjs(dateExpired).endOf('day').toDate()
        },
      }};

      var model = await new MongooseHelper(this.model)
        .query(filter)
        .lookup('plan', 'domainplans')
        .lookup('customer', 'customers')
        .sort('createdAt', -1)
        .paging(_page, 10)
        .excute();
      return model;
    } catch {
      throw new NotFoundException();
    }
  }

  async findDomainExpired(_page: any) {
    try {
      var currentDate = new Date();
      var filter = {};

      filter ={ $match: {
        'expiredAt': { $lte: currentDate },
      }};

      var model = await new MongooseHelper(this.model)
        .query(filter)
        .lookup('plan', 'domainplans')
        .lookup('customer', 'customers')
        .sort('createdAt', -1)
        .paging(_page, 10)
        .excute();
      return model;
    } catch {
      throw new NotFoundException();
    }
  }

  async findDomainByCustomerId(_page: any, customerId?: string) {
    try {
      var filter = {};
      filter = {
        $match: {
          'customer': new Types.ObjectId(customerId)
        }
      };

      var model = await new MongooseHelper(this.model)
        .query(filter)
        .lookup('plan', 'domainplans')
        .sort('createdAt', -1)
        .paging(_page, 3)
        .excute();
      return model;
    } catch {
      throw new NotFoundException();
    }
  }

  async totalPriceByMonth() {
    try {
      var model = await this.model.aggregate([
        {
          $group: {
            _id: {
              _id: { year: "$startedAt", month: "$startedAt" },
              num: { $sum :1 }
            },
          }
        }
      ]).sort({"_id": 1}).exec();
      return model;

    } catch {
      throw new NotFoundException();
    }
  }

  async checkforExpired() {
    let currentDate = new Date().toISOString();
    console.log(currentDate)
    var expried = await this.model.find({
      'expiredAt': { $lte: currentDate },
    });
    // console.log(expried.map(p=>p.expiredAt),expried.length)
    for await(const item of expried) {
      item.status = DomainsStatus.EXPIRED;
      await item.save();
    }

    var nExpried = await this.model.find({
      'expiredAt': { $lt: dayjs(currentDate).add(30, 'day').toISOString(),$gte: currentDate }
    });
    for await(const item of nExpried) {
      item.status = DomainsStatus.NEAR_EXPIRED;
      let dayLeft = dayjs(item.expiredAt).diff(dayjs(currentDate), 'day');
      console.log("Day Left: " + dayLeft)
      await item.save();
    }
  }

  async static(){
    await this.checkforExpired();
    var data = {};
    //Total
    var model = await this.model.find().count();
    data['total'] = model;
    //Expried
    data['expried'] = await this.model.find({status: DomainsStatus.EXPIRED}).count();
    //near_expried
    data['near_expried'] = await this.model.find({status: DomainsStatus.NEAR_EXPIRED}).count();
    return data;
  }

  async staticByMonth(){
    await this.checkforExpired();
    var data = {};
    //Total
    var model = await this.model.find().count();
    data['total'] = model;
    //Expried
    data['expried'] = await this.model.find({status: DomainsStatus.EXPIRED}).count();
    //near_expried
    data['near_expried'] = await this.model.find({status: DomainsStatus.NEAR_EXPIRED}).count();
    return data;
  }

  
}
