import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw new UnauthorizedException({
                message: 'Unauthorized',
                statusCode: HttpStatus.UNAUTHORIZED,
                error: { code: HttpStatus.UNAUTHORIZED, details: 'You do not have access, jwt must be provide' }
            });
        }
        return user;
    }
}