'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import TypeformPopup from '../components/ui/TypeformPopup';

type FormData = {
  revenue: string;
  budget: string;
  website: string;
  instagram: string;
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

  const openLeadForm = () => {
    setIsFormOpen(true);
  };

  const closeLeadForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (data: FormData) => {
    // Here you would typically send the data to your backend
    setIsFormOpen(false);
    setIsFormSubmitted(true);
  };

  return (
    <LeadFormContext.Provider
      value={{
        openLeadForm,
        closeLeadForm,
        isFormOpen,
        isFormSubmitted,
      }}
    >
      {children}
      
      {/* Typeform Popup */}
      <TypeformPopup 
        isOpen={isFormOpen} 
        onClose={closeLeadForm} 
        onSubmit={handleFormSubmit} 
      />
    </LeadFormContext.Provider>
  );
}; 