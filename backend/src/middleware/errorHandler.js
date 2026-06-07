import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Always log errors for debugging in server logs
  console.error(`[Error ${statusCode}] ${req.method} ${req.path}:`, {
    message: err.message,
    stack: err.stack,
    body: req.body,
    query: req.query,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
