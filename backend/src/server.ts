import "dotenv/config";
import { createApp } from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`1Fi Marketplace API listening on http://localhost:${PORT}`);
});