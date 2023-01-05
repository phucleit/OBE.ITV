import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { GooglesService } from './googles.service';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Googles } from './schemas/googles.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('googles')
export class GooglesController {
  constructor(private readonly googlesService: GooglesService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Googles})
  @Post()
  create(@Body() createGoogleDto: CreateGoogleDto) {
    return this.googlesService.create(createGoogleDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Googles})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.googlesService.findGooglePeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.googlesService.findGoogleExpired(query.page);
    } else if (query.customerId) {
      return this.googlesService.findGoogleByCustomerId(query.page, query.customerId);
    } else {
      return this.googlesService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Googles})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.googlesService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Googles})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoogleDto: UpdateGoogleDto) {
    return this.googlesService.update(id, updateGoogleDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Googles})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googlesService.remove(id);
  }
}
