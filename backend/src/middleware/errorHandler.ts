import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}