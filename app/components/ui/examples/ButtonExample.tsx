"use client";

import { Button } from "../button";

export function ButtonExample() {
  return (
    <div className="flex flex-col space-y-8 p-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-h2">Shadcn Button Examples</h2>
        <p className="text-base text-muted-foreground">
          Examples of button components using Zentric branding with Shadcn UI
        </p>
      </div>
      
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="text-h3">Zentric Brand Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="brand">
              Primary Brand Button
            </Button>
            <Button variant="secondaryBrand" size="brand">
              Secondary Brand Button
            </Button>
            <Button variant="tertiary">
              Tertiary Link
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-h3">Default Shadcn Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-h3">Size Variants</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </Button>
            <Button size="brand" variant="primary">Brand Size</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-h3">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 