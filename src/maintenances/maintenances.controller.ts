import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { MaintenancesService } from './maintenances.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Maintenances } from './schemas/maintenances.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('maintenances')
export class MaintenancesController {
  constructor(private readonly maintenancesService: MaintenancesService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Maintenances})
  @Post()
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenancesService.create(createMaintenanceDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Maintenances})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.maintenancesService.findMaintenancePeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.maintenancesService.findMaintenanceExpired(query.page);
    } else if (query.customerId) {
      return this.maintenancesService.findMaintenanceByCustomerId(query.page, query.customerId);
    } else {
      return this.maintenancesService.findAll(query.page, query.search);
    }
  }
  
  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Maintenances})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenancesService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Maintenances})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintenanceDto: UpdateMaintenanceDto) {
    return this.maintenancesService.update(id, updateMaintenanceDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Maintenances})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenancesService.remove(id);
  }
}
