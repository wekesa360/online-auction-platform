import config from '../config.js';

const errorHandler = (err, req, res, next) => {
  const isProduction = config.env === 'production';

  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  if (typeof err === 'string') {
    // Custom application error
    statusCode = 400;
    errorMessage = err;
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    errorMessage = Object.values(err.errors).map((val) => val.message).join(', ');
  } else if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    statusCode = 401;
    errorMessage = 'Invalid Token';
  } else {
    // Other errors
    errorMessage = isProduction ? 'Internal Server Error' : err.message;
  }

  const errorResponse = {
    statusCode,
    message: errorMessage,
  };

  if (!isProduction) {
    errorResponse.stack = err.stack;
  }

  return res.status(statusCode).json(errorResponse);
};

export default errorHandler;