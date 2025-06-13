'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import LeadForm from '../components/ui/LeadForm';

type FormData = {
  revenue: string;
  budget: string;
  website: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  referralSource: string;
}

type LeadFormContextType = {
  openLeadForm: () => void;
  closeLeadForm: () => void;
  isFormOpen: boolean;
  isFormSubmitted: boolean;
  capturedEmail: string | null;
};

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export const useLeadForm = () => {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error('useLeadForm must be used within a LeadFormProvider');
  }
  return context;
};

type LeadFormProviderProps = {
  children: ReactNode;
};

export const LeadFormProvider = ({ children }: LeadFormProviderProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null);

  const openLeadForm = () => {
    setIsFormOpen(true);
  };

  const closeLeadForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (data: FormData) => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    setCapturedEmail(data.email);
    setIsFormOpen(false);
    setIsFormSubmitted(true);
    
    // You can add API calls here to submit the data
    // Example:
    // fetch('/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
  };

  return (
    <LeadFormContext.Provider
      value={{
        openLeadForm,
        closeLeadForm,
        isFormOpen,
        isFormSubmitted,
        capturedEmail,
      }}
    >
      {children}
      
      {/* Lead Form */}
      <LeadForm 
        isOpen={isFormOpen} 
        onClose={closeLeadForm} 
        onSubmit={handleFormSubmit} 
      />
    </LeadFormContext.Provider>
  );
}; 