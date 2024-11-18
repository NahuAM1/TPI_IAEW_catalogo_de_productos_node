import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth0Client } from '@auth0/auth0-spa-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth0Client: Auth0Client) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `muoiPN0RwYlmXBz7xGVk1bjtvW_J3fdG3cVyFq53DupOHozweCZLG8631nM8mlBu`,
      audience: `https://dev-dvun1ebacfriw1nd.us.auth0.com/api/v2/`,
      issuer: `https://dev-dvun1ebacfriw1nd.us.auth0.com/`,
    });
  }

  validate(payload: any) {
    return this.auth0Client.getUser();
  }
}
