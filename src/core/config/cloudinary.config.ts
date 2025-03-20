import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const cloudinarySchema = Joi.object({
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required()
}).unknown(true);

const { error, value: cloudinaryVars } = cloudinarySchema.validate(process.env);

if (error) {
    throw new Error(`Cloudinary Config validation error: ${error.message}`);
}

export default registerAs('cloudinary', () => ({
    name:cloudinaryVars.CLOUDINARY_CLOUD_NAME,
    apiKey: cloudinaryVars.CLOUDINARY_API_KEY,
    apiSecret: cloudinaryVars.CLOUDINARY_API_SECRET
}));