import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PoliciesGuard } from 'src/casl/ability.guard';
import { CheckAbilities, CheckPolicies } from 'src/casl/ability.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { UserRole } from "./../user-roles/schemas/userRole.schema";

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @CheckAbilities({action: Action.Create, subject: UserRole})
  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesService.create(createUserRoleDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckAbilities({action: Action.Read, subject: UserRole})
  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @CheckAbilities({action: Action.Read, subject: UserRole})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(id);
  }

  @CheckAbilities({action: Action.Update, subject: UserRole})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesService.update(id, updateUserRoleDto);
  }

  @CheckAbilities({action: Action.Delete, subject: UserRole})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(id);
  }

  @Delete('/user/remove')
  removeUser(@Query() query) {
    return this.userRolesService.removeUser(query.role, query.user);
  }


  @Get('module/all')
  allModule(){
    return this.userRolesService.allModule()
  }
}
