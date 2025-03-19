import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Something went wrong';
        let errorDetails: string | null | any = "An unexpected error occurred";

        if (exception instanceof HttpException) {
            const res = exception.getResponse();
            status = exception.getStatus();

            if (typeof res === 'string') {
                message = res;
                errorDetails = res;
            } else if (typeof res === 'object') {
                message = (res as any).message || message;
                errorDetails = (res as any).error || (res as any).details || null;
            }

            if (typeof errorDetails === 'object' && errorDetails.details) {
                errorDetails = errorDetails.details;
            }

            if (!errorDetails) {
                errorDetails = message;
            }
        }

        if (exception instanceof BadRequestException) {
            const responseObj = exception.getResponse() as any;
            if (Array.isArray(responseObj.error)) {
                errorDetails = responseObj.error
                    .map(err => `${err.field}: ${err.message}`)
                    .join(', '); 
            }
            status = HttpStatus.BAD_REQUEST;
            message = "Data Validation Error";
        }

        console.log(errorDetails,"from error filter")

        response.status(status).json({
            status: "error",
            error: true,
            message,
            statusCode: status,
            errors: {
                code: status,
                details: errorDetails
            }
        });
    }
}
