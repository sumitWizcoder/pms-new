import { Request, Response, NextFunction } from 'express';

/**
 * The "Safety Net" that catches any error we didn't handle manually
 */
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('--- SERVER ERROR ---');
  console.error(err.stack); // Log the full error to the terminal for the developer

  const status = err.status || 500;
  const message = err.message || 'An unexpected error occurred on the server';

  res.status(status).json({
    message,
    // Only show the stack trace if we are in development mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
