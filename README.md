# Zentric Digital Landing Page

A high-converting landing page for Zentric Digital, an ecommerce growth agency specializing in CRO, Meta Ads, and Lifecycle Email marketing for DTC brands.

## Tech Stack

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Shadcn UI** for customizable UI components
- **Framer Motion** for animations
- **TypeScript** for type safety
- **Neon PostgreSQL** for serverless database
- **Drizzle ORM** for type-safe database queries

## Key Features

- **Ultra-fast performance** optimized with Next.js
- **Responsive design** for all device sizes
- **Modular components** for easy maintenance and iteration
- **Conversion-focused layout** following proven landing page frameworks
- **Brand-consistent UI** following Zentric's design guidelines
- **Two-step lead capture form** with partial submission saving
- **Rate-limited API endpoints** to prevent abuse

## Project Structure

- `app/` - Next.js App Router structure
  - `page.tsx` - Main landing page
  - `layout.tsx` - Root layout with metadata
  - `globals.css` - Global styles and Tailwind directives
- `app/components/` - React components
  - `sections/` - Main page sections
  - `ui/` - Reusable UI components built with Shadcn UI
- `app/api/` - API routes
  - `leads/` - Lead form submission endpoints
  - `cron/` - Scheduled tasks like reminder emails
- `app/lib/` - Shared utilities and libraries
  - `db/` - Database schema and connections
  - `rate-limit.ts` - Rate limiting implementation
- `app/shadcn-components/` - Shadcn UI component gallery and documentation
- `public/` - Static assets
  - `fonts/` - Custom fonts
  - `images/` - Images and icons

## Page Sections

The landing page is composed of the following sections in order:

1. **Hero** - Main value proposition and primary CTA. The "Learn More" button is hidden on mobile to focus on the main call-to-action.
2. **Comparison** - Differentiates Zentric from traditional agencies, with a responsive layout for clear mobile viewing.
3. **SolutionSection** - Details the "Zentric Growth Engine" and its core benefits.
4. **FinalCta** - A final, compelling call-to-action that includes merged risk-reversal and performance guarantees to build trust.
5. **Footer** - Contact information and supplementary links.

## Getting Started

### Prerequisites

- Node.js 20+ and npm/yarn
- Neon PostgreSQL database (or other Postgres provider)

### Installation

```bash
# Install dependencies
npm install
nvm use 20

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# Run database migrations
node run-migration.js

# Run development server
pnpm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database Setup

The project uses Neon PostgreSQL for storing lead form submissions. See `DATABASE_SETUP.md` for detailed instructions on setting up the database and running migrations.

## Lead Form Integration

The two-step lead form captures emails immediately in step 1, then collects additional information in step 2:

1. API endpoints handle form submissions with validation and rate limiting
2. Includes loading indicators for better UX during submission
3. Implements follow-up reminders for incomplete submissions via cron jobs

## Conversion Optimization Notes

- **Primary CTA** ("Book Free Discovery Call") appears consistently throughout.
- **Mobile-First UX** - The UI is decluttered on smaller screens to prioritize key actions and improve readability.
- Social proof and guarantees are used to build credibility and reduce friction.
- **Two-step form process** increases initial conversion rates by capturing the email first.

## Performance Considerations

- Optimized images with proper sizing and formats
- Component-level code-splitting with Next.js
- Minimal third-party dependencies
- Efficient animations with Framer Motion
- Serverless database with auto-scaling capabilities

## Customization

- Brand colors and typography defined in `tailwind.config.js`
- Component styles follow consistent patterns
- Section content can be easily modified in respective component files
- Shadcn UI components can be customized in `app/components/ui/`
- For detailed Shadcn UI usage guidelines, see `shadcn-usage-guide.md`

## Static Asset Caching

Static assets with hashed filenames (e.g., `logo.abcd1234.png`) are served with long-term caching. The production server sets `Cache-Control: public, max-age=31536000, immutable` for files under `/_next/static` and any hashed files in `public/`.

## Changelog

- **2024-07-26 (e9916e2):** feat(cta): Enhanced the `FinalCta` section by merging the `Guarantees` component directly into it. This refactor consolidates the final call to action with powerful trust-building elements, including both pricing and service-level guarantees with unique iconography. The standalone `Guarantees` component was removed to streamline the codebase.

