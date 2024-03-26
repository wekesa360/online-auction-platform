import CustomError from '../helpers/custom-error.js';

const authorize = (roles = []) => {
  return (req, res, next) => {
    try {
      //console.log("In authorize", req.user, roles)
      if (roles.length && !roles.includes(req.user.role)) {
        throw new CustomError('Insufficient permissions. Unauthorized', 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export { authorize };