import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '@providers/prisma';

const SECRET_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6IlNvbHIifQ.SWCJDd6B_m7xr_puQH-wgbxvXyJYXH9lTpldOU0eQKc";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('auth.jwt.secret') || SECRET_KEY,
    });
  }

  async validate(payload: { id: string; email: string; role: string }) {
    const user = await this.prismaService.users.findUnique({
      where: { email: payload.email },
      select: { id: true, email: true, role: true }
    });

    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
        statusCode: HttpStatus.UNAUTHORIZED,
        error: { code: HttpStatus.UNAUTHORIZED, details: 'unauthorized access' }
      });
    }

    return user;
  }
}
