import { BadRequestException } from '@nestjs/common';

export const validationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err: any) => `${err.property}: ${Object.values(err.constraints).join(', ')}`).join(', ');
        return new BadRequestException({ message: "Input Validation Error", error: formattedErrors });
    }
};
