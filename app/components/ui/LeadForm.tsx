'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Button } from './button';

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
  phone: z.string().min(1, { message: "Phone number is required" }),
  referralSource: z.string().min(1, { message: "Please select how you heard about us" }),
});

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

// Steps in the form
type FormStep = 'email' | 'details' | 'thanks';

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
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('email');
        setErrors({});
        setEmailSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  // Reset form data when popup is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          email: '',
          revenue: '',
          budget: '',
          website: '',
          firstName: '',
          lastName: '',
          phone: '',
          referralSource: '',
        });
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
        setErrors(error.formErrors.fieldErrors);
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
        setErrors(error.formErrors.fieldErrors);
      }
      return false;
    }
  };

  const handleEmailStep = async () => {
    if (validateEmail()) {
      // Here we would typically send the email to the backend
      setEmailSubmitted(true);
      setStep('details');
      
      // Clear any errors
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (validateFullForm()) {
      setStep('thanks');
      
      // Small delay to show the thank you message before closing
      setTimeout(() => {
        onSubmit(formData);
      }, 1500);
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

  // If not open, don't render anything
  if (!isOpen) return null;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const popupVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { 
        duration: 0.2
      }
    }
  };

  const contentVariants = {
    enter: { 
      x: 20, 
      opacity: 0 
    },
    center: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: { 
        duration: 0.2
      }
    }
  };

  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-white">
          Get your free growth assessment
        </h3>
        <p className="text-white/70">
          Enter your email to get started. We'll send you personalized growth strategies based on your business details.
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email address <span className="text-mint-green">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="you@company.com"
          className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
      </div>
    </div>
  );
  
  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-white">
          Help us understand your business
        </h3>
        <p className="text-white/70">
          We need these details to create a tailored growth strategy for your specific business needs.
        </p>
      </div>
      
      {/* Revenue Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white">
          What is your brand's monthly revenue? <span className="text-mint-green">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['€0 – €25 k', '€25 k – €50 k', '€50 k – €150 k', '> €150 k'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleInputChange('revenue', option)}
              className={`p-4 rounded-2xl text-left transition-all ${
                formData.revenue === option 
                  ? 'bg-iris-purple text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.revenue && <p className="text-red-400 text-sm">{errors.revenue}</p>}
      </div>
      
      {/* Budget Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white">
          What is your marketing budget? <span className="text-mint-green">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['€0 – €1 k', '€1 k – €2 k', '€2 k – €4 k', '> €4 k'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleInputChange('budget', option)}
              className={`p-4 rounded-2xl text-left transition-all ${
                formData.budget === option 
                  ? 'bg-iris-purple text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.budget && <p className="text-red-400 text-sm">{errors.budget}</p>}
      </div>
      
      {/* Website */}
      <div className="space-y-2">
        <label htmlFor="website" className="text-sm font-medium text-white">
          What's your website URL? <span className="text-mint-green">*</span>
        </label>
        <input
          id="website"
          type="text"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          placeholder="https://yourbrand.com"
          className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
        />
        {errors.website && <p className="text-red-400 text-sm">{errors.website}</p>}
      </div>
      
      {/* Contact Information */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white">
          Your contact information <span className="text-mint-green">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="First name"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Last name"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Phone number"
            className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      
      {/* Referral Source */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white">
          How did you hear about us? <span className="text-mint-green">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['LinkedIn', 'E-mail', 'Word of Mouth', 'Other'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleInputChange('referralSource', option)}
              className={`p-4 rounded-2xl text-left transition-all ${
                formData.referralSource === option 
                  ? 'bg-iris-purple text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.referralSource && <p className="text-red-400 text-sm">{errors.referralSource}</p>}
      </div>
    </div>
  );
  
  const renderThankYouStep = () => (
    <div className="space-y-6 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-mint-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-2xl font-semibold text-white">Thank you for applying!</h3>
      <p className="text-white/80">We'll be in touch within 24 hours to schedule your discovery call.</p>
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
    switch (step) {
      case 'email':
        return 33;
      case 'details':
        return 66;
      case 'thanks':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          <div className="flex items-center justify-center min-h-screen px-4 py-12">
            <motion.div 
              className="relative bg-deep-navy w-full max-w-2xl rounded-3xl border border-white/10 shadow-lg overflow-hidden"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bar with time estimate */}
              {step !== 'thanks' && (
                <div className="relative pt-4 px-8">
                  <div className="flex justify-between text-xs text-white/60 mb-2">
                    <span>
                      {step === 'email' ? 'Step 1 of 2' : 'Step 2 of 2'}
                    </span>
                    <span>Takes less than 2 minutes</span>
                  </div>
                  <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-iris-purple transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation buttons */}
              {step !== 'thanks' && (
                <div className="p-6 bg-black/20 flex justify-between">
                  {step === 'email' ? (
                    <div /> // Empty div to maintain flex spacing
                  ) : (
                    <Button
                      variant="secondaryBrand"
                      onClick={() => setStep('email')}
                    >
                      Back
                    </Button>
                  )}
                  
                  <Button
                    variant="primary"
                    onClick={step === 'email' ? handleEmailStep : handleSubmit}
                  >
                    {step === 'email' ? 'Continue' : 'Submit Application'}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadForm;