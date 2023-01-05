import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { SslsService } from './ssls.service';
import { CreateSslDto } from './dto/create-ssl.dto';
import { UpdateSslDto } from './dto/update-ssl.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Ssls } from './schemas/ssls.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('ssls')
export class SslsController {
  constructor(private readonly sslsService: SslsService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Ssls})
  @Post()
  create(@Body() createSslDto: CreateSslDto) {
    return this.sslsService.create(createSslDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Ssls})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.sslsService.findSslPeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.sslsService.findSslExpired(query.page);
    } else if (query.customerId) {
      return this.sslsService.findSslByCustomerId(query.page, query.customerId);
    } else {
      return this.sslsService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Ssls})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sslsService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Ssls})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSslDto: UpdateSslDto) {
    return this.sslsService.update(id, updateSslDto);
  } 

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Ssls})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sslsService.remove(id);
  }
}
