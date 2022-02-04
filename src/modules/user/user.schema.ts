import * as Joi from 'joi';
import { MESSAGES } from '../../utils';

export const loginSchema = Joi.object({
    user_name_email: Joi.string().required(),
    password: Joi.string().required(),
}).messages({
    'string.base': MESSAGES.VALIDATION.INCORRECT_FORMAT,
    'any.required': MESSAGES.VALIDATION.REQUIRED,
});
