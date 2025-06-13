'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Button } from './button';
import { cn } from '../../lib/utils';
import { Check, ChevronDown, ChevronLeft, Loader, X, AlertCircle } from 'lucide-react';

// Define the form data structure
type FormData = {
  email: string;
  revenue: string;
  budget: string;
  website: string;
  firstName: string;
  lastName: string;
  phone: string;
  referralSource: string;
  otherReferral: string;
  submissionId?: string; // Add submission ID for tracking the form
}

// Form validation schema using Zod
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

const fullFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  revenue: z.string().min(1, { message: "Please select your monthly revenue" }),
  budget: z.string().min(1, { message: "Please select your marketing budget" }),
  website: z.string().url({ message: "Please enter a valid website URL" }).or(z.string().min(1, { message: "Please enter your website URL" })),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().optional(),
  referralSource: z.string().min(1, { message: "Please select how you heard about us" }),
  otherReferral: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.referralSource === 'other' && (!data.otherReferral || data.otherReferral.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify",
      path: ["otherReferral"],
    });
  }
});

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

// Steps in the form
type FormStep = 'email' | 'details' | 'thanks';

// Local storage key for form data
const FORM_STORAGE_KEY = 'zentric_lead_form_data';

// Loading spinner component
const LoadingSpinner = () => (
  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
);

const LeadForm = ({ isOpen, onClose, onSubmit }: LeadFormProps) => {
  const [step, setStep] = useState<FormStep>('email');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    revenue: '',
    budget: '',
    website: '',
    firstName: '',
    lastName: '',
    phone: '',
    referralSource: '',
    otherReferral: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load saved form data from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        
        // If we have a submission ID, it means the user already completed step 1
        if (parsedData.submissionId) {
          setEmailSubmitted(true);
          setStep('details');
        }
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, [formData]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('email');
        setErrors({});
        setEmailSubmitted(false);
        setErrorMessage(null);
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const validateEmail = () => {
    try {
      emailSchema.parse({ email: formData.email });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert the ZodError format to our format
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const validateFullForm = () => {
    try {
      fullFormSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert the ZodError format to our format
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleEmailStep = async () => {
    if (validateEmail()) {
      setIsSubmitting(true);
      setErrorMessage(null);
      
      try {
        // Call API to capture email
        const response = await fetch('/api/leads/capture-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit email');
        }
        
        // Save the submission ID in the form data
        setFormData(prev => ({
          ...prev,
          submissionId: data.submissionId
        }));
        
        // Update UI state
        setEmailSubmitted(true);
        setStep('details');
        setErrors({});
      } catch (error) {
        console.error('Error submitting email:', error);
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (validateFullForm() && formData.submissionId) {
      setIsSubmitting(true);
      setErrorMessage(null);
      
      try {
        // Call API to complete the form submission
        const response = await fetch('/api/leads/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            submissionId: formData.submissionId
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit form');
        }
        
        // Update UI state
        setStep('thanks');
        
        // Clear localStorage after successful submission
        localStorage.removeItem(FORM_STORAGE_KEY);
        
        // Small delay to show the thank you message before closing
        setTimeout(() => {
          onSubmit(formData);
          onClose();
        }, 1500);
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear the error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const inputClasses = (field: keyof FormData) =>
    cn(
      "w-full bg-card/50 border border-border rounded-lg p-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-300",
      errors[field] && "border-red-500/50 ring-2 ring-red-500/20"
    );
    
  const selectClasses = (field: keyof FormData) =>
    cn(
        "appearance-none",
        inputClasses(field)
    );

  const renderEmailStep = () => (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <h2 className="text-3xl font-bold text-foreground">Let's Start with Your Email</h2>
      <p className="text-lg text-muted-foreground mt-2 mb-8">We'll use this to create your growth profile.</p>
      
      <div className="relative w-full max-w-sm mx-auto">
        <input
            type="email"
            placeholder="e.g., you@company.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={cn(inputClasses('email'), "p-4 text-base")}
            disabled={isSubmitting}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitting) {
                    e.preventDefault();
                    handleEmailStep();
                }
            }}
        />
        {errors.email && <p className="text-red-400 text-sm mt-2 ml-1 text-left">{errors.email}</p>}
      </div>

      <div className="mt-8 w-full max-w-sm mx-auto">
        <Button variant="primary" size="lg" className="w-full py-3" onClick={handleEmailStep} disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner /> : 'Continue'}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">Takes less than 1 minute.</p>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div>
      <div className="flex-shrink-0">
        <button onClick={() => setStep('email')} className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-foreground text-center">Tell Us About Your Business</h2>
        <p className="text-muted-foreground text-center mt-2 mb-8">This helps us tailor the strategy session for you.</p>
      </div>

      <div className="max-h-[50vh] overflow-y-auto pr-4 -mr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={inputClasses('firstName')}
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={inputClasses('lastName')}
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.lastName}</p>}
          </div>

          {/* Phone Number */}
          <div className="md:col-span-2">
            <input
              type="tel"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={inputClasses('phone')}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>}
          </div>

          {/* Website */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Your Website URL"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className={inputClasses('website')}
            />
            {errors.website && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.website}</p>}
          </div>

          {/* Monthly Revenue */}
          <div className="relative md:col-span-1">
            <select
              value={formData.revenue}
              onChange={(e) => handleInputChange('revenue', e.target.value)}
              className={selectClasses('revenue')}
            >
              <option value="" disabled>Monthly Revenue</option>
              <option value="<10k">Less than $10k</option>
              <option value="10k-50k">$10k - $50k</option>
              <option value="50k-100k">$50k - $100k</option>
              <option value=">100k">More than $100k</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            {errors.revenue && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.revenue}</p>}
          </div>

          {/* Marketing Budget */}
          <div className="relative md:col-span-1">
            <select
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className={selectClasses('budget')}
            >
              <option value="" disabled>Marketing Budget</option>
              <option value="<1k">Less than $1k</option>
              <option value="1k-5k">$1k - $5k</option>
              <option value="5k-10k">$5k - $10k</option>
              <option value=">10k">More than $10k</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            {errors.budget && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.budget}</p>}
          </div>
          
          {/* Referral Source */}
          <div className="relative md:col-span-2">
              <select
                  value={formData.referralSource}
                  onChange={(e) => handleInputChange('referralSource', e.target.value)}
                  className={selectClasses('referralSource')}
              >
                  <option value="" disabled>How did you hear about us?</option>
                  <option value="google">Google</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              {errors.referralSource && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.referralSource}</p>}
          </div>

          {/* Other Referral Source Input */}
          {formData.referralSource === 'other' && (
            <div className="md:col-span-2">
                <input
                    type="text"
                    placeholder="Please specify"
                    value={formData.otherReferral}
                    onChange={(e) => handleInputChange('otherReferral', e.target.value)}
                    className={inputClasses('otherReferral')}
                />
                {errors.otherReferral && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.otherReferral}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="pt-6">
        <Button variant="primary" size="lg" className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : 'Submit & Book Call'}
        </Button>
      </div>
    </div>
  );

  const renderThankYouStep = () => (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
      >
        <Check size={32} className="text-green-400" />
      </motion.div>
      <h2 className="text-2xl font-bold text-foreground mt-6">Thank You!</h2>
      <p className="text-muted-foreground mt-2">Your request has been sent.<br/>We'll be in touch shortly.</p>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 'email':
        return renderEmailStep();
      case 'details':
        return renderDetailsStep();
      case 'thanks':
        return renderThankYouStep();
      default:
        return null;
    }
  };

  const getProgressPercentage = () => {
    if (step === 'email') return 33;
    if (step === 'details') return 66;
    if (step === 'thanks') return 100;
    return 0;
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 25 } },
    exit: { opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-card w-full max-w-2xl p-8 md:p-12 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
            
            {/* Progress Bar */}
            {step !== 'thanks' && (
              <div className="w-full bg-card/70 rounded-full h-1.5 mb-8">
                <motion.div
                  className="bg-primary h-1.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
            
            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 mb-6 flex items-center gap-3">
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                </div>
            )}
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadForm;