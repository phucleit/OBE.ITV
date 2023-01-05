import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Domains } from './schemas/domains.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';
@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Domains})
  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainsService.create(createDomainDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Domains})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.domainsService.findDomainPeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.domainsService.findDomainExpired(query.page);
    } else if (query.customerId) {
      return this.domainsService.findDomainByCustomerId(query.page, query.customerId);
    } else if (query.groupByMonth == 1) {
      return this.domainsService.totalPriceByMonth();
    } else {
      return this.domainsService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Domains})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainsService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Domains})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainsService.update(id, updateDomainDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Domains})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainsService.remove(id);
  }
}
