import { SetMetadata, UseGuards } from "@nestjs/common";
import { Action, Subjects} from './casl-ability.factory'
import { applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PolicyHandler } from "./ability.handler";

export interface RequireRule {
    action: Action,
    subject: Subjects,
}

export const CHECK_ABILITY = 'check_ability';

//export const CheckAbilities = (...requirements: RequireRule[]) =>  

export function CheckAbilities(...requirements: RequireRule[]) {
    return applyDecorators(
        SetMetadata(CHECK_ABILITY,requirements),
        UseGuards(JwtAuthGuard)
    );
}

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);