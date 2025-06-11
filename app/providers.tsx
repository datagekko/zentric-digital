'use client';

import React from 'react';
import { LeadFormProvider } from './contexts/LeadFormContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LeadFormProvider>
      {children}
    </LeadFormProvider>
  );
} 