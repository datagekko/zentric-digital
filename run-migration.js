// Script to manually execute migrations against Neon PostgreSQL
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Get database URL from environment variables
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Database URL not found. Please set NEON_DATABASE_URL or DATABASE_URL in .env.local');
  process.exit(1);
}

// Read the SQL migration file
const migrationPath = path.join(__dirname, 'app', 'lib', 'db', 'migrations', 'schema.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

// Connect to the database
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false // Required for some Neon connections
  }
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('🔄 Running migration...');
    await client.query(migrationSQL);
    console.log('✅ Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration(); 