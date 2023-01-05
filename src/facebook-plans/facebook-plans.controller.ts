import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { FacebookPlansService } from './facebook-plans.service';
import { CreateFacebookPlanDto } from './dto/create-facebook-plan.dto';
import { UpdateFacebookPlanDto } from './dto/update-facebook-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { FacebookPlans } from './schemas/facebook-plans.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('facebook-plans')
export class FacebookPlansController {
  constructor(private readonly facebookPlansService: FacebookPlansService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: FacebookPlans})
  @Post()
  create(@Body() createFacebookPlanDto: CreateFacebookPlanDto) {
    return this.facebookPlansService.create(createFacebookPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: FacebookPlans})
  @Get()  
  findAll(@Query() query) {
    return this.facebookPlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: FacebookPlans})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facebookPlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: FacebookPlans})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacebookPlanDto: UpdateFacebookPlanDto) {
    return this.facebookPlansService.update(id, updateFacebookPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: FacebookPlans})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facebookPlansService.remove(id);
  }
}
