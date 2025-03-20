import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const authSchema = Joi.object({
    JWT_SECRET: Joi.string().required()
}).unknown(true);

const { error, value: authVars } = authSchema.validate(process.env);

if (error) {
    throw new Error(`Auth Config validation error: ${error.message}`);
}

export default registerAs('auth', () => ({
    jwt: {
        secret: authVars.JWT_SECRET,
    }
}));