import { I18nResolver } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class CustomHeaderResolver implements I18nResolver {
  constructor(private readonly fallbackLanguage: string = 'en') {}

  resolve(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();

    // Extract the language from the custom 'x-language-headers'
    return request.headers['x-language-headers'] || this.fallbackLanguage;
  }

  resolveFallback(): string {
    return this.fallbackLanguage;
  }
}
