import CustomError from '../helpers/custom-error.js';

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      throw new CustomError('Unauthorized', 403);
    }
    next();
  };
};

export { authorize } ;