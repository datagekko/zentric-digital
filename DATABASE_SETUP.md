# Database Setup for Lead Form

This document outlines how to set up the database for storing lead form submissions.

## Technology Stack

- **Database**: Neon PostgreSQL (serverless, auto-scaling)
- **ORM**: Drizzle ORM
- **Rate Limiting**: Upstash Redis
- **Schema Migrations**: Drizzle Kit

## Setup Instructions

### 1. Install Neon via Vercel Integration

1. Go to your Vercel Dashboard
2. Navigate to Storage → Browse Marketplace → Select Neon
3. Follow the integration steps
4. Vercel will automatically add the required environment variables

### 2. Complete Environment Setup

Create a `.env.local` file in your project root with the following variables (use `.env.example` as a template):

```
# Database (Neon PostgreSQL)
NEON_DATABASE_URL=postgres://username:password@ep-host-id.region.aws.neon.tech/database?sslmode=require

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-region.upstash.io/redis/your-redis-id
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Cron Job Secret (used for scheduled tasks)
CRON_SECRET=your-random-secure-string
```

### 3. Run Database Migrations

Execute the following command to create the required database tables:

```bash
npx drizzle-kit push:pg
```

### 4. Set Up Vercel Cron Jobs for Reminder Emails

1. Go to your Vercel project settings
2. Navigate to the "Cron Jobs" section
3. Create a new cron job with the following settings:
   - Name: `reminder-emails`
   - Schedule: `0 */6 * * *` (runs every 6 hours)
   - Command: `curl -X GET $VERCEL_URL/api/cron/reminder-emails -H "Authorization: Bearer $CRON_SECRET"`

## Database Schema

The lead submissions are stored in a single table with the following structure:

- `id`: Unique identifier (CUID2)
- `email`: User's email address
- `status`: Form status (`partial` or `complete`)
- `revenue`: Monthly revenue range
- `budget`: Marketing budget range
- `website`: Website URL
- `firstName`: First name
- `lastName`: Last name
- `phone`: Phone number
- `referralSource`: How they found us
- `createdAt`: Timestamp when the record was created
- `updatedAt`: Timestamp when the record was last updated
- `remindersCount`: Number of reminder emails sent
- `lastReminderAt`: Timestamp of the last reminder email
- `completedAt`: Timestamp when the form was completed
- `ipAddress`: IP address for rate limiting
- `userAgent`: User agent for analytics

## API Endpoints

The database is accessed through the following API endpoints:

- **POST /api/leads/capture-email**: Stores the email from step 1
- **POST /api/leads/complete**: Stores the complete form data from step 2
- **GET /api/cron/reminder-emails**: Sends reminder emails to users who abandoned the form

## Rate Limiting

Rate limiting is implemented using Upstash Redis to prevent abuse:

- Max 5 requests per minute per IP address

## Data Persistence

Form data is stored in localStorage to allow users to return and complete their form later.

## Debugging

Check the Vercel logs for any database connection issues or errors. 