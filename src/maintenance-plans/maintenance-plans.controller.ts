import { Controller, Get, Post, Body, Patch, Param, Delete, Query ,UseGuards } from '@nestjs/common';
import { MaintenancePlansService } from './maintenance-plans.service';
import { CreateMaintenancePlanDto } from './dto/create-maintenance-plan.dto';
import { UpdateMaintenancePlanDto } from './dto/update-maintenance-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { MaintenancePlans } from './schemas/maintenance-plans.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('maintenance-plans')
export class MaintenancePlansController {
  constructor(private readonly maintenancePlansService: MaintenancePlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: MaintenancePlans})
  @Post()
  create(@Body() createMaintenancePlanDto: CreateMaintenancePlanDto) {
    return this.maintenancePlansService.create(createMaintenancePlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: MaintenancePlans})
  @Get()
  findAll(@Query() query) {
    return this.maintenancePlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: MaintenancePlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenancePlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: MaintenancePlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintenancePlanDto: UpdateMaintenancePlanDto) {
    return this.maintenancePlansService.update(id, updateMaintenancePlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: MaintenancePlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenancePlansService.remove(id);
  }
}
