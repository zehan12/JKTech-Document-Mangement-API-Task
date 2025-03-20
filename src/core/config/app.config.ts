import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const appSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().port().required(),
}).unknown(true);

const { error, value: appVars } = appSchema.validate(process.env);

if (error) {
    throw new Error(`App Config validation error: ${error.message}`);
}

export default registerAs('app', () => ({
    env: appVars.NODE_ENV,
    port: appVars.PORT,
}));
