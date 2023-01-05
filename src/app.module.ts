import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { CustomersModule } from './customers/customers.module';
import { DomainPlansModule } from './domain-plans/domain-plans.module';
import { DomainsModule } from './domains/domains.module';
import { HostingPlansModule } from './hosting-plans/hosting-plans.module';
import { HostingsModule } from './hostings/hostings.module';
import { SslPlansModule } from './ssl-plans/ssl-plans.module';
import { SslsModule } from './ssls/ssls.module';
import { EmailPlansModule } from './email-plans/email-plans.module';
import { EmailsModule } from './emails/emails.module';
import { GooglePlansModule } from './google-plans/google-plans.module';
import { GooglesModule } from './googles/googles.module';
import { ContentPlansModule } from './content-plans/content-plans.module';
import { ContentsModule } from './contents/contents.module';
import { MaintenancePlansModule } from './maintenance-plans/maintenance-plans.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { FacebookPlansModule } from './facebook-plans/facebook-plans.module';
import { FacebooksModule } from './facebooks/facebooks.module';
import { ContractsModule } from './contracts/contracts.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { StaticModule } from './static/static.module';

@Module({ 
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(), 
    MongooseModule.forRoot("mongodb://admin:123asdCat@45.119.86.103:10000/oldcrm",{
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        connection.plugin(require('mongoose-paginate'));
        return connection;
      }
    }),
    AuthModule, UserModule, FilesModule, CustomersModule, DomainPlansModule, 
    DomainsModule, HostingPlansModule, HostingsModule, SslPlansModule, SslsModule, EmailPlansModule, EmailsModule, 
    GooglePlansModule, GooglesModule, ContentPlansModule, ContentsModule, MaintenancePlansModule, MaintenancesModule,
    FacebookPlansModule, FacebooksModule, ContractsModule, UserRolesModule, StaticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}