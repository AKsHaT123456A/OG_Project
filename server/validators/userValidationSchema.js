const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().regex(/^[a-zA-Z]+(?: [a-zA-Z.]+){0,2}$/).required(),
}).prefs({ convert: false });

module.exports = userValidationSchema;
