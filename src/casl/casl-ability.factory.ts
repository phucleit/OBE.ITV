import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/schemas/user.schema";
import { UserRole } from "./../user-roles/schemas/userRole.schema";
import { Domains } from "./../domains/schemas/domains.schema";
import { DomainPlans } from "src/domain-plans/schemas/domain-plans.schema";
import { Hostings } from "src/hostings/schemas/hostings.schema";
import { HostingPlans } from "src/hosting-plans/schemas/hosting-plans.schema";
import { Contracts} from "src/contracts/schemas/contracts.schema";
import { Customers } from "src/customers/schemas/customers.schema";
import { Emails } from "src/emails/schemas/emails.schema";
import { EmailPlans } from "src/email-plans/schemas/email-plans.schema";
import { Facebooks } from "src/facebooks/schemas/facebooks.schema";
import { FacebookPlans } from "src/facebook-plans/schemas/facebook-plans.schema";
import { Googles } from "src/googles/schemas/googles.schema";
import { GooglePlans } from "src/google-plans/schemas/google-plans.schema";
import { Maintenances } from "src/maintenances/schemas/maintenances.schema";
import { MaintenancePlans } from "src/maintenance-plans/schemas/maintenance-plans.schema";
import { Contents } from "src/contents/schemas/contents.schema";
import { ContentPlans } from "src/content-plans/schemas/content-plans.schema";
import { Ssls } from "src/ssls/schemas/ssls.schema";
import { SslPlans } from "src/ssl-plans/schemas/ssl-plans.schema";
import { UserService } from "src/user/user.service";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<
typeof User | 
typeof UserRole | 
typeof Domains |
typeof DomainPlans |
typeof Hostings |
typeof HostingPlans |
typeof Contracts |
typeof Customers |
typeof Emails |
typeof EmailPlans |
typeof Facebooks |
typeof FacebookPlans |
typeof Googles |
typeof GooglePlans |
typeof Maintenances |
typeof MaintenancePlans |
typeof Contents |
typeof ContentPlans |
typeof Ssls |
typeof SslPlans
>
| 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(
    public userService: UserService
  ) {};

  async createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    user = await this.userService.findByUserName(user.username)
    console.log("aaa >>",user.username)
    if (user && user.isAdmin ) {
      can(Action.Manage, 'all');
      can(Action.Read, 'all'); 
      can(Action.Create, 'all');
      can(Action.Update, 'all');
      can(Action.Delete, 'all'); 
      } else {
      cannot(Action.Manage, 'all').because("??? hoi lam gi")
      cannot(Action.Read, 'all').because("??? hoi lam gi")
      cannot(Action.Create, 'all').because("??? hoi lam gi")
      cannot(Action.Update, 'all').because("??? hoi lam gi")
      cannot(Action.Delete, 'all').because("??? hoi lam gi")
      user.role['modules'].forEach(role => {
        if(role.casl.manage) can(Action.Manage, role.casl.module)
        if(role.casl.read) can(Action.Read, role.casl.module)
        if(role.casl.create) can(Action.Create, role.casl.module)
        if(role.casl.update) can(Action.Update, role.casl.module)
        if(role.casl.delete) can(Action.Delete, role.casl.module)
      });
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}


