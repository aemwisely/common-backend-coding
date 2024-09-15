import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IJwtUserDecorator {
  data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
  };
}

export const JwtDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IJwtUserDecorator;
});
