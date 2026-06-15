import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Server-side logging for debugging
  console.error(`[Error ${statusCode}] ${req.method} ${req.originalUrl}`, {
    message: err.message,
    stack: err.stack,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  // Handle MongoDB/Mongoose timeout errors
  if (
    err.message?.includes("buffering timed out") ||
    err.name === "MongooseServerSelectionError"
  ) {
    return res.status(503).json({
      success: false,
      message:
        "The database is currently unavailable. Please try again later.",
    });
  }

  // Handle invalid MongoDB ObjectIds
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID.",
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join(", "),
    });
  }

  // Prevent sending multiple responses
  if (res.headersSent) {
    return;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};