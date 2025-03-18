import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const SECRETKEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6IlNvbHIifQ.SWCJDd6B_m7xr_puQH-wgbxvXyJYXH9lTpldOU0eQKc"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || SECRETKEY
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
