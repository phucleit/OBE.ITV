import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { SslPlansService } from './ssl-plans.service';
import { CreateSslPlanDto } from './dto/create-ssl-plan.dto';
import { UpdateSslPlanDto } from './dto/update-ssl-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { SslPlans } from './schemas/ssl-plans.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('ssl-plans')
export class SslPlansController {
  constructor(private readonly sslPlansService: SslPlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: SslPlans})
  @Post()
  create(@Body() createSslPlanDto: CreateSslPlanDto) {
    return this.sslPlansService.create(createSslPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: SslPlans})
  @Get()
  findAll(@Query() query) {
    return this.sslPlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: SslPlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sslPlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: SslPlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSslPlanDto: UpdateSslPlanDto) {
    return this.sslPlansService.update(id, updateSslPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: SslPlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sslPlansService.remove(id);
  }
}
