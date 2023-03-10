import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaticService } from './static.service';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Get()
  getStatic() {
    return this.staticService.getStatic();
  }
}
