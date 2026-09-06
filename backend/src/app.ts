import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import productsRouter from "./routes/products";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ status: "ok" }));
  app.use("/api/products", productsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}