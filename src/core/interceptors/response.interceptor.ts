import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((responseData) => {
                return {
                    status: "success",
                    error: false, 
                    message: responseData.message || "Request successful",
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    data: responseData.data !== undefined ? responseData.data : responseData,
                };
            }),
        );
    }
}
