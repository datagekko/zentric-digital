# Zentric Digital Landing Page

A high-converting landing page for Zentric Digital, an ecommerce growth agency specializing in CRO, Meta Ads, and Lifecycle Email marketing for DTC brands.

## Tech Stack

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TypeScript** for type safety

## Key Features

- **Ultra-fast performance** optimized with Next.js
- **Responsive design** for all device sizes
- **Modular components** for easy maintenance and iteration
- **Conversion-focused layout** following proven landing page frameworks
- **Brand-consistent UI** following Zentric's design guidelines

## Project Structure

- `app/` - Next.js App Router structure
  - `page.tsx` - Main landing page
  - `layout.tsx` - Root layout with metadata
  - `globals.css` - Global styles and Tailwind directives
- `app/components/` - React components
  - `sections/` - Main page sections
  - `ui/` - Reusable UI components
- `public/` - Static assets
  - `fonts/` - Custom fonts
  - `images/` - Images and icons

## Page Sections

The landing page follows a structured storytelling approach with these sections:

1. **Hero** - Main value proposition and primary CTA
2. **Credibility Bar** - Client logos and trust indicators
3. **PAS Slab** - Problem → Agitation → Solution framework
4. **Offer Stack** - Service tiers and pricing options
5. **Proof Wall** - Testimonials and case studies
6. **Process Timeline** - How Zentric works with clients
7. **Comparison** - Differentiators vs traditional agencies
8. **Risk Reversal** - Guarantee and objection handling
9. **Final CTA** - Compelling closing call-to-action
10. **Footer** - Contact info and supplementary links

## Getting Started

### Prerequisites

- Node.js 20+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install
nvm use 20

# Run development server
pnpm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Conversion Optimization Notes

- **Primary CTA** ("Book Free Discovery Call") appears consistently throughout
- Each section addresses specific objections in the buyer's journey
- Social proof elements strategically placed to boost credibility
- Risk reversal with "No Results, No Fee" guarantee reduces friction
- Scarcity indicators create urgency without being manipulative

## Performance Considerations

- Optimized images with proper sizing and formats
- Component-level code-splitting with Next.js
- Minimal third-party dependencies
- Efficient animations with Framer Motion

## Customization

- Brand colors and typography defined in `tailwind.config.js`
- Component styles follow consistent patterns
- Section content can be easily modified in respective component files 
## Static Asset Caching

Static assets with hashed filenames (e.g., `logo.abcd1234.png`) are served with long-term caching. The production server sets `Cache-Control: public, max-age=31536000, immutable` for files under `/_next/static` and any hashed files in `public/`.

