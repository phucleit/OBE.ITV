import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Emails } from './schemas/emails.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Emails})
  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.create(createEmailDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Emails})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.emailsService.findEmailPeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.emailsService.findEmailExpired(query.page);
    } else if (query.customerId) {
      return this.emailsService.findEmailByCustomerId(query.page, query.customerId);
    } else {
      return this.emailsService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Emails})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailsService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Emails})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailsService.update(id, updateEmailDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Emails})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailsService.remove(id);
  }
}
