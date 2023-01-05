import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards, Req } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Customers } from './schemas/customers.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Customers})
  @Post('')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Customers})
  @Get()
  findAll(@Query() query) {
    if (query.typeCustomer == 'personal') {
      return this.customersService.findPersonalType(query.page);
    } else if (query.typeCustomer == 'company') {
      return this.customersService.findCompanyType(query.page);
    } else if (query.typeCustomer == 'friendly') {
      return this.customersService.findFriendlyType(query.page);
    } else {
      return this.customersService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Customers})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Customers})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Customers})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Customers})
  @Get('/service/static')
  getService(@Query() query) {
    return this.customersService.staticService(query.page);
  }
}
