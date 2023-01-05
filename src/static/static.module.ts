import { Module } from '@nestjs/common';
import { StaticService } from './static.service';
import { StaticController } from './static.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from 'src/customers/customers.module';
import { DomainPlansModule } from 'src/domain-plans/domain-plans.module';
import { DomainsModule } from 'src/domains/domains.module';
import { HostingPlansModule } from 'src/hosting-plans/hosting-plans.module';
import { HostingsModule } from 'src/hostings/hostings.module';
import { SslPlansModule } from 'src/ssl-plans/ssl-plans.module';
import { SslsModule } from 'src/ssls/ssls.module';
import { EmailPlansModule } from 'src/email-plans/email-plans.module';
import { EmailsModule } from 'src/emails/emails.module';
import { GooglePlansModule } from 'src/google-plans/google-plans.module';
import { GooglesModule } from 'src/googles/googles.module';
import { ContentPlansModule } from 'src/content-plans/content-plans.module';
import { ContentsModule } from 'src/contents/contents.module';
import { MaintenancePlansModule } from 'src/maintenance-plans/maintenance-plans.module';
import { MaintenancesModule } from 'src/maintenances/maintenances.module';
import { FacebookPlansModule } from 'src/facebook-plans/facebook-plans.module';
import { FacebooksModule } from 'src/facebooks/facebooks.module';
import { ContractsModule } from 'src/contracts/contracts.module';
import { UserRolesModule } from 'src/user-roles/user-roles.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    CustomersModule, DomainPlansModule, UserModule,
    DomainsModule, HostingPlansModule, HostingsModule, SslPlansModule, SslsModule, EmailPlansModule, EmailsModule, 
    GooglePlansModule, GooglesModule, ContentPlansModule, ContentsModule, MaintenancePlansModule, MaintenancesModule,
    FacebookPlansModule, FacebooksModule, ContractsModule, UserRolesModule
  ],
  controllers: [StaticController],
  providers: [StaticService]
})
export class StaticModule {}

