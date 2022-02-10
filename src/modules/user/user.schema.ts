import * as Joi from 'joi';
import { MESSAGES } from '../../utils';

export const loginSchema = Joi.object({
    username_email: Joi.string().required(),
    password: Joi.string().required(),
}).messages({
    'string.base': MESSAGES.VALIDATION.INCORRECT_FORMAT,
    'any.required': MESSAGES.VALIDATION.REQUIRED,
});
