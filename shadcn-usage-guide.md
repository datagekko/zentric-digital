# Shadcn UI Usage Guide for Zentric Digital

This document provides guidelines for using Shadcn UI components within the Zentric Digital project to ensure consistency with our brand guidelines and existing component framework.

## Overview

[Shadcn UI](https://ui.shadcn.com/) is a collection of reusable components built using Radix UI and Tailwind CSS. It's not a component library but rather a collection of re-usable components that you can copy and paste into your apps.

We've integrated Shadcn UI to provide a solid foundation for building consistent, accessible, and customizable UI components for our landing page.

## Setup

Shadcn UI has been set up in the project with the following configuration:

- Style: New York
- Base color: Zinc
- CSS variables: Enabled
- React Server Components: Enabled
- TypeScript: Enabled
- Icon library: Lucide

## Usage Guidelines

### 1. Using Existing Components

To use an existing component:

```tsx
import { Button } from "@/components/ui/button";

export function MyComponent() {
  return (
    <Button variant="primary" size="brand">
      Get Started
    </Button>
  );
}
```

### 2. Adding New Components

To add a new Shadcn component:

```bash
# Add a component to your project
npx shadcn-ui@latest add [component-name]

# Example
npx shadcn-ui@latest add card
```

Due to our workspace setup with pnpm, you may need to add the `-w` flag when installing dependencies:

```bash
pnpm add [dependency-name] -w
```

### 3. Customizing Components

Components are located in `app/components/ui/[component-name]`. You can modify these files directly to match our brand guidelines.

#### Example: Button Customization

Our button component has been extended with Zentric-specific variants:

- `primary`: Uses gradient background with white text
- `secondaryBrand`: Iris purple border with transparent background
- `tertiary`: Simple text links with hover effect

```tsx
// Example usage
<Button variant="primary" size="brand">Primary CTA</Button>
<Button variant="secondaryBrand" size="brand">Secondary Action</Button>
<Button variant="tertiary">Learn More</Button>
```

### 4. Utility Functions

The `cn` utility function is available to help compose class names with Tailwind CSS:

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")}>
  Content
</div>
```

## Brand Integration

All Shadcn components have been customized to align with Zentric Digital's branding:

1. **Colors**: Custom color variables are defined in `globals.css` to match our brand palette
2. **Typography**: Font settings follow our brand guidelines
3. **Border radius**: Rounded corners use our 3xl setting for consistency
4. **Animations**: Subtle transitions maintain our brand feel

## Extending the System

When creating new components:

1. First, check if a Shadcn component can be used or customized
2. Follow the same pattern of using variants and sizes
3. Maintain accessibility standards
4. Ensure responsive behavior matches existing components

## Component Conventions

When building components with Shadcn UI for this project:

1. Keep primary content above the fold when possible
2. Use button text with `whitespace-nowrap` to prevent text wrapping
3. Follow the section component structure outlined in our component framework
4. Apply subtle animations through Tailwind classes or the `tailwindcss-animate` package

## Resources

- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- [Component Reference](https://ui.shadcn.com/docs/components/accordion)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 