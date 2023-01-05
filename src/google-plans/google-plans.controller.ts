import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { GooglePlansService } from './google-plans.service';
import { CreateGooglePlanDto } from './dto/create-google-plan.dto';
import { UpdateGooglePlanDto } from './dto/update-google-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { GooglePlans } from './schemas/google-plans.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('google-plans')
export class GooglePlansController {
  constructor(private readonly googlePlansService: GooglePlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: GooglePlans})
  @Post()
  create(@Body() createGooglePlanDto: CreateGooglePlanDto) {
    return this.googlePlansService.create(createGooglePlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: GooglePlans})
  @Get()
  findAll(@Query() query) {
    return this.googlePlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: GooglePlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.googlePlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: GooglePlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGooglePlanDto: UpdateGooglePlanDto) {
    return this.googlePlansService.update(id, updateGooglePlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: GooglePlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googlePlansService.remove(id);
  }
}
