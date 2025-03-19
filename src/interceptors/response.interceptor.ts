import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log("✅ ResponseInterceptor is running");
        console.log()
        return next.handle().pipe(
            map((responseData) => {
                console.log(responseData,"data")
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
