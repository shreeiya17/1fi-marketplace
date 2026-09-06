import { PrismaClient } from "@prisma/client";

// Reused across the app instead of creating a new client per request,
// which would exhaust the Postgres connection pool under load.
export const prisma = new PrismaClient();