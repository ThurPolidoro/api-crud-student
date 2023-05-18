/* eslint-disable no-underscore-dangle */
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  REDIS_HOST: z.string().default('redis'),
  MYSQL_HOST: z.string().default('localhost'),
  MYSQL_USER: z.string().default('root'),
  MYSQL_PASS: z.string().default('123456'),
  MYSQL_PORT: z.string().default('3307'),
  MYSQL_DATABASE: z.string()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.issues);

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
