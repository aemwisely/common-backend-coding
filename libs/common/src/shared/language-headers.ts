import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  createParamDecorator,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

@Injectable()
export class LanguageHeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const languageHeaders = request.headers['x-language-headers'];

    const validateHeader = languageHeaders || 'en';

    request.languageHeader = validateHeader;

    return next.handle();
  }
}

export function ApiGlobalHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'x-language-headers',
      required: false,
    }),
  );
}

export const LocaleLanguageHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.languageHeader;
  },
);
