import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards} from '@nestjs/common';
import { EmailPlansService } from './email-plans.service';
import { CreateEmailPlanDto } from './dto/create-email-plan.dto';
import { UpdateEmailPlanDto } from './dto/update-email-plan.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Emails } from 'src/emails/schemas/emails.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('email-plans')
export class EmailPlansController {
  constructor(private readonly emailPlansService: EmailPlansService) {}

  @UseGuards(PoliciesGuard)  
  @CheckAbilities({action: Action.Create, subject: Emails})
  @Post()
  create(@Body() createEmailPlanDto: CreateEmailPlanDto) {
    return this.emailPlansService.create(createEmailPlanDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Emails})
  @Get()
  findAll(@Query() query) {
    return this.emailPlansService.findAll(query.page);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Emails})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailPlansService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Emails})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailPlanDto: UpdateEmailPlanDto) {
    return this.emailPlansService.update(id, updateEmailPlanDto);
  }
  
  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Emails})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailPlansService.remove(id);
  }
}
