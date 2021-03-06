import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthenticationModule } from './services/authentication/authentication.module';
import { UsersProfileModule } from './services/profiles/profiles.modules';
import { AuthorizationModule } from './services/authorization/authorization.module';
import { mongoConstants } from '@constants/index';
import { EventsModule } from './sockets/events/events.module';

import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { WinstonOptions } from '@shared/winston/winston.logger';

import { TypegooseModule } from 'nestjs-typegoose';
import { ResellerModule } from '@services/businesses/reseller.module';
import { AdminModule } from '@services/ecommerce/admin/admin.module';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from '@shared/termius/termius.service';
import { VideoUploadModule } from '@services/video-upload/video-upload.module';

@Module({
  imports: [

    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    // BookModule,
    WinstonModule.forRoot(WinstonOptions),
    TypegooseModule.forRoot(mongoConstants.uri, mongoConstants.options),
    // GraphQLModule.forRoot({
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: 'schema.gql',
    // }),
    AuthenticationModule,
    AuthorizationModule,

    UsersProfileModule,

    EventsModule,

    // ecommerce
    ResellerModule,
    AdminModule,
    VideoUploadModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
