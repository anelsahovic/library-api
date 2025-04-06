import { RequestHandler, Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validateData<T>(
  schema: ZodSchema<T>
): RequestHandler<unknown, unknown, T, unknown> {
  return (
    req: Request<unknown, unknown, T, unknown>,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        res.status(400).json({
          error: 'Validation error',
          details: errorMessages,
        });

        return;
      }

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
