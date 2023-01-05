import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { HostingsService } from './hostings.service';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Hostings } from './schemas/hostings.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('hostings')
export class HostingsController {
  constructor(private readonly hostingsService: HostingsService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Hostings})
  @Post()
  create(@Body() createHostingDto: CreateHostingDto) {
    return this.hostingsService.create(createHostingDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Hostings})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.hostingsService.findHostingPeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.hostingsService.findHostingExpired(query.page);
    } else if (query.customerId) {
      return this.hostingsService.findHostingByCustomerId(query.page, query.customerId);
    } else {
      return this.hostingsService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Hostings})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostingsService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Hostings})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostingDto: UpdateHostingDto) {
    return this.hostingsService.update(id, updateHostingDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Hostings})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostingsService.remove(id);
  }
}
