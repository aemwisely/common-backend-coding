import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/database.module';
import { ConfigModule } from '@config/config.module';
import { ApiModule } from '@application/api.module';
import { AuthModule } from '@authen/authen.module';
import { join } from 'path';
import { I18nModule } from 'nestjs-i18n';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomHeaderResolver, LanguageHeadersInterceptor } from '@libs/common/shared';

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
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguageHeadersInterceptor, // Your interceptor
    },
  ],
})
export class AppModule {}
