import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('user', 'admin').default('user'),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password'),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };