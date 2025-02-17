// eslint-disable-next-line import/no-unresolved
import httpStatus from 'http-status';
import schemas from './utils/schema.js';

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const { statusCode = httpStatus.INTERNAL_SERVER_ERROR, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  res.status(statusCode).send(response);
}

const validate = (path) => (req, res, next) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const schema = schemas[path];
  const { error, value } = schema.validate(req.body, validationOptions);

  if (error) {
    const response = {
      statusCode: httpStatus.BAD_REQUEST,
      error: {
        original: error._original,
        details: error.details.map((data, type) => ({
          message: data.message.replace(/['"\\]/g, ''),
          type,
        })),
      },
    };

    return res.status(response.statusCode).send(response);
  }

  req.body = value;
  return next();
};

export default {
  notFound,
  errorHandler,
  validate,
};
