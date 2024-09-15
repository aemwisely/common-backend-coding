import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { join } from 'path';
import { IJwtUserDecorator } from './jwt.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: readFileSync(join('.', 'key.pub'), 'utf8'),
    });
  }

  async validate(payload: IJwtUserDecorator, done: VerifiedCallback): Promise<any> {
    return done(null, payload);
  }
}
