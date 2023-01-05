import { Controller, Get, Post, Body, Patch, Param, Delete, Query ,UseGuards} from '@nestjs/common';
import { FacebooksService } from './facebooks.service';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Facebooks } from './schemas/facebooks.schema';
import { PoliciesGuard } from 'src/casl/ability.guard';

@Controller('facebooks')
export class FacebooksController {
  constructor(private readonly facebooksService: FacebooksService) {}

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Create, subject: Facebooks})
  @Post()
  create(@Body() createFacebookDto: CreateFacebookDto) {
    return this.facebooksService.create(createFacebookDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Facebooks})
  @Get()
  findAll(@Query() query) {
    if (query.periodType == 1) {
      return this.facebooksService.findGooglePeriod(query.page);
    } else if (query.expiredType == 2) {
      return this.facebooksService.findGoogleExpired(query.page);
    } else if (query.customerId) {
      return this.facebooksService.findFacebookByCustomerId(query.page, query.customerId);
    } else {
      return this.facebooksService.findAll(query.page, query.search);
    }
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: Facebooks})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facebooksService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Update, subject: Facebooks})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacebookDto: UpdateFacebookDto) {
    return this.facebooksService.update(id, updateFacebookDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Delete, subject: Facebooks})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facebooksService.remove(id);
  }
}
