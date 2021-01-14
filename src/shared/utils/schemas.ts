import Joi from 'joi';

const EMAIL_SCHEMA = Joi.string().email().required();

export { EMAIL_SCHEMA };
