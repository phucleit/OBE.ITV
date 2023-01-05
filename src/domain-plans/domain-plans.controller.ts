import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { DomainPlansService } from './domain-plans.service';
import { CreateDomainPlanDto } from './dto/create-domain-plan.dto';
import { UpdateDomainPlanDto } from './dto/update-domain-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { DomainPlans } from './schemas/domain-plans.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('domain-plans')
export class DomainPlansController {
  constructor(private readonly domainPlansService: DomainPlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: DomainPlans})
  @Post()
  create(@Body() createDomainPlanDto: CreateDomainPlanDto) {
    return this.domainPlansService.create(createDomainPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: DomainPlans})
  @Get()
  findAll(@Query() query) {
    return this.domainPlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: DomainPlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainPlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: DomainPlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainPlanDto: UpdateDomainPlanDto) {
    return this.domainPlansService.update(id, updateDomainPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: DomainPlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainPlansService.remove(id);
  }
}
