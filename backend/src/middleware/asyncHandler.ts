import { NextFunction, Request, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

// Wraps an async controller so a rejected promise is forwarded to Express's
// error middleware instead of crashing the process or hanging the request.
export function asyncHandler(fn: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}