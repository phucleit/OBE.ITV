import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ContentPlansService } from './content-plans.service';
import { CreateContentPlanDto } from './dto/create-content-plan.dto';
import { UpdateContentPlanDto } from './dto/update-content-plan.dto';
import { ContentPlans } from './schemas/content-plans.schema';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('content-plans')
export class ContentPlansController {
  constructor(private readonly contentPlansService: ContentPlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: ContentPlans})
  @Post()
  create(@Body() createContentPlanDto: CreateContentPlanDto) {
    return this.contentPlansService.create(createContentPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: ContentPlans})
  @Get()
  findAll(@Query() query) {
    return this.contentPlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: ContentPlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentPlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: ContentPlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentPlanDto: UpdateContentPlanDto) {
    return this.contentPlansService.update(id, updateContentPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: ContentPlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentPlansService.remove(id);
  }
}
