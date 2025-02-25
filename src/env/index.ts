import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test", override: true });
} else {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_CLIENT: z.enum(["pg", "sqlite"]).default("pg"),
  DATABASE_URL: z.string(),
  AUTH_JWT_SECRET: z.string().default("default"),
  PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
