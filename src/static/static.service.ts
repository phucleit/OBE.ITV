import { Injectable } from '@nestjs/common';
import { CreateStaticDto } from './dto/create-static.dto';
import { UpdateStaticDto } from './dto/update-static.dto';
import { CustomersService } from 'src/customers/customers.service';
import { DomainPlansService } from 'src/domain-plans/domain-plans.service';
import { DomainsService } from 'src/domains/domains.service';
import { HostingPlansService } from 'src/hosting-plans/hosting-plans.service';
import { HostingsService } from 'src/hostings/hostings.service';
import { SslPlansService } from 'src/ssl-plans/ssl-plans.service';
import { SslsService } from 'src/ssls/ssls.service';
import { EmailPlansService } from 'src/email-plans/email-plans.service';
import { EmailsService } from 'src/emails/emails.service';
import { GooglePlansService } from 'src/google-plans/google-plans.service';
import { GooglesService } from 'src/googles/googles.service';
import { ContentPlansService } from 'src/content-plans/content-plans.service';
import { ContentsService } from 'src/contents/contents.service';
import { MaintenancePlansService } from 'src/maintenance-plans/maintenance-plans.service';
import { MaintenancesService } from 'src/maintenances/maintenances.service';
import { FacebookPlansService } from 'src/facebook-plans/facebook-plans.service';
import { FacebooksService } from 'src/facebooks/facebooks.service';
import { ContractsService } from 'src/contracts/contracts.service';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StaticService {
  constructor(
    public CustomersService : CustomersService,
    public DomainPlansService : DomainPlansService,
    public DomainsService : DomainsService,
    public HostingPlansService : HostingPlansService,
    public HostingsService : HostingsService,
    public SslPlansService : SslPlansService,
    public SslsService : SslsService,
    public EmailPlansService : EmailPlansService,
    public EmailsService : EmailsService,
    public GooglePlansService : GooglePlansService,
    public GooglesService : GooglesService,
    public ContentPlansService : ContentPlansService,
    public ContentsService : ContentsService,
    public MaintenancePlansService : MaintenancePlansService,
    public MaintenancesService : MaintenancesService,
    public FacebookPlansService : FacebookPlansService,
    public FacebooksService : FacebooksService,
    public ContractsService : ContractsService,
    public UserRolesService : UserRolesService,
    public UserService : UserService
  ) {};

  public async getStatic(){
    var data = {
      customers : await this.CustomersService.static(),
      domainPlans : await this.DomainPlansService.static(),
      domains : await this.DomainsService.static(),
      hostingPlans : await this.HostingPlansService.static(),
      hostings : await this.HostingsService.static(),
      sslPlans : await this.SslPlansService.static(),
      ssls : await this.SslsService.static(),
      emailPlans : await this.EmailPlansService.static(),
      emails : await this.EmailsService.static(),
      googlePlans : await this.GooglePlansService.static(),
      googles : await this.GooglesService.static(),
      contentPlans : await this.ContentPlansService.static(),
      contents : await this.ContentsService.static(),
      maintenancePlans : await this.MaintenancePlansService.static(),
      maintenances : await this.MaintenancesService.static(),
      facebookPlans : await this.FacebookPlansService.static(),
      facebooks : await this.FacebooksService.static(),
      contracts : await this.ContractsService.static(),
      userRoles : await this.UserRolesService.static(),
      users : await this.UserService.static()
    }
    return data;
  }
}
