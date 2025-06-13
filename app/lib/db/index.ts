import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Optional: Disable usage of WebSockets in environments that don't allow them
neonConfig.fetchConnectionCache = true;

// Get the database URL from environment variables
// Check NEON_DATABASE_URL first, then fall back to DATABASE_URL (as provided by Vercel)
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

// Log connection status for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  if (!databaseUrl) {
    console.warn('⚠️ No database URL found. Please set NEON_DATABASE_URL or DATABASE_URL in your .env.local file.');
  } else {
    console.log('✅ Database URL found. Connecting to PostgreSQL.');
  }
}

// Check if database URL is defined
if (!databaseUrl) {
  throw new Error("Database URL is not defined in environment variables. Set NEON_DATABASE_URL or DATABASE_URL.");
}

// Create a Neon client with error handling
let sql;
try {
  sql = neon(databaseUrl);
} catch (error) {
  console.error("Failed to create Neon client:", error);
  throw new Error(`Failed to connect to database: ${error instanceof Error ? error.message : String(error)}`);
}

// Create a database client with the schema
export const db = drizzle(sql, { schema });

// Export a type for the database client
export type DbClient = typeof db; 