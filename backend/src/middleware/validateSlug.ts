import { NextFunction, Request, Response } from "express";
import { ApiError } from "./errorHandler";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Rejects malformed slugs before they ever reach the database layer.
export function validateSlug(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  if (!slug || !SLUG_PATTERN.test(slug)) {
    throw new ApiError(400, `Invalid product slug "${slug}"`);
  }
  next();
}