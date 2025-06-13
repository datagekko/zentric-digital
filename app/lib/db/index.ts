import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Optional: Disable usage of WebSockets in environments that don't allow them
neonConfig.fetchConnectionCache = true;

let db: NeonHttpDatabase<typeof schema> | null = null;

export const getDb = () => {
  if (db) {
    return db;
  }

  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

  // Log connection status for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    if (!databaseUrl) {
      console.warn('⚠️ No database URL found. Please set NEON_DATABASE_URL or DATABASE_URL in your .env.local file.');
    } else {
      console.log('✅ Database URL found. Connecting to PostgreSQL.');
    }
  }

  if (!databaseUrl) {
    throw new Error("Database URL is not defined in environment variables. Set NEON_DATABASE_URL or DATABASE_URL.");
  }
  
  const sql = neon(databaseUrl);
  
  db = drizzle(sql, { schema });
  
  return db;
};

// Export a type for the database client
export type DbClient = NeonHttpDatabase<typeof schema>; 