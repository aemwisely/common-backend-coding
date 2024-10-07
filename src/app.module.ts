import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/database.module';
import { ConfigModule } from '@config/config.module';
import { ApiModule } from '@application/api.module';
import { AuthModule } from '@authen/authen.module';
import { join } from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';

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
      resolvers: [{ use: AcceptLanguageResolver, options: ['lang', 'locale', 'l'] }],
    }),
  ],
})
export class AppModule {}
