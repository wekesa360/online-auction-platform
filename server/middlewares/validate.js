import CustomError from '../helpers/custom-error.js';

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    next();
  };
};

export default validate;