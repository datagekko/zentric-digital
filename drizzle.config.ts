import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env.local' });

// Ensure environment variables are set
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Database URL is not defined in environment variables. Set NEON_DATABASE_URL or DATABASE_URL.");
}

// For the drizzle-kit migration tool
export default defineConfig({
  schema: './app/lib/db/schema.ts',
  out: './app/lib/db/migrations',
  dialect: 'postgresql',
  driver: 'pg',
  dbCredentials: {
    connectionString: databaseUrl,
  },
}); 