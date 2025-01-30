import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseModule } from '@config/database.module';
import { ConfigModule } from '@config/config.module';
import { ApiModule } from '@application/api.module';
import { AuthModule } from '@authen/authen.module';
import { join } from 'path';
import { I18nModule, I18nService } from 'nestjs-i18n';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  CustomHeaderResolver,
  I18nServiceHelper,
  LanguageHeadersInterceptor,
} from '@libs/common/shared';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    DatabaseModule,
    ApiModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '..', '/i18n/'),
        watch: true,
      },
      resolvers: [
        new CustomHeaderResolver('en'), // Use your custom resolver with fallback language 'en'
      ],
    }),
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60, limit: 10 }] }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguageHeadersInterceptor, // Your interceptor
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // ใช้เป็น Global Guard
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly i18nService: I18nService) {}

  onModuleInit() {
    I18nServiceHelper.setI18nService(this.i18nService);
  }
}
