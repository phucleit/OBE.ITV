import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { HostingPlansService } from './hosting-plans.service';
import { CreateHostingPlanDto } from './dto/create-hosting-plan.dto';
import { UpdateHostingPlanDto } from './dto/update-hosting-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { HostingPlans } from './schemas/hosting-plans.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('hosting-plans')
export class HostingPlansController {
  constructor(private readonly hostingPlansService: HostingPlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: HostingPlans})
  @Post()
  create(@Body() createHostingPlanDto: CreateHostingPlanDto) {
    return this.hostingPlansService.create(createHostingPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: HostingPlans})
  @Get()
  findAll(@Query() query) {
    return this.hostingPlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: HostingPlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostingPlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: HostingPlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostingPlanDto: UpdateHostingPlanDto) {
    return this.hostingPlansService.update(id, updateHostingPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: HostingPlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostingPlansService.remove(id);
  }
}
