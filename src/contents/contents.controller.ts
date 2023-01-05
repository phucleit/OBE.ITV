import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Contents } from './schemas/contents.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Contents})
  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Contents})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.contentsService.findContentPeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.contentsService.findContentExpired(query.page);
    } else if (query.customerId) {
      return this.contentsService.findContentByCustomerId(query.page, query.customerId);
    } else {
      return this.contentsService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Contents})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Contents})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(id, updateContentDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Contents})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(id);
  }
}
