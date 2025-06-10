'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

type TypeformPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const TypeformPopup = ({ isOpen, onClose, onSubmit }: TypeformPopupProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    revenue: '',
    budget: '',
    website: '',
    instagram: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    referralSource: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(0);
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  // Reset form data when popup is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          revenue: '',
          budget: '',
          website: '',
          instagram: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
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

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 0: // Revenue
        if (!formData.revenue) {
          newErrors.revenue = 'Please select your monthly revenue';
        }
        break;
      case 1: // Budget
        if (!formData.budget) {
          newErrors.budget = 'Please select your marketing budget';
        }
        break;
      case 2: // Website
        if (!formData.website) {
          newErrors.website = 'Please enter your website URL';
        } else if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/i.test(formData.website)) {
          newErrors.website = 'Please enter a valid website URL';
        }
        break;
      case 3: // Instagram (optional)
        // No validation required as it's optional
        break;
      case 4: // Contact info
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 5: // Referral
        if (!formData.referralSource) {
          newErrors.referralSource = 'Please select how you heard about us';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 5) {
        // Final step - submit form
        setCurrentStep(6); // Show thank you message
        setTimeout(() => {
          onSubmit(formData);
        }, 1500); // Small delay to show the thank you message
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
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

  // Define steps with questions and inputs
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              What is your brand's monthly revenue? <span className="text-mint-green">*</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['€0 – €25 k', '€25 k – €50 k', '€50 k – €150 k', '> €150 k'].map((option) => (
                <button
                  key={option}
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
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              What is your marketing budget? <span className="text-mint-green">*</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['€0 – €1 k', '€1 k – €2 k', '€2 k – €4 k', '> €4 k'].map((option) => (
                <button
                  key={option}
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
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              What's your website URL? <span className="text-mint-green">*</span>
            </h3>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourbrand.com"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
            />
            {errors.website && <p className="text-red-400 text-sm">{errors.website}</p>}
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">Your Instagram URL (optional)</h3>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              placeholder="https://instagram.com/yourbrand"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
            />
            <p className="text-white/60 text-sm">This field is optional</p>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              Your contact information <span className="text-mint-green">*</span>
            </h3>
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
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email address"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-iris-purple"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              How did you hear about us? <span className="text-mint-green">*</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['LinkedIn', 'E-mail', 'Word of Mouth', 'Other'].map((option) => (
                <button
                  key={option}
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
        );
      
      case 6:
        return (
          <div className="space-y-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-mint-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-white">Thank you for applying!</h3>
            <p className="text-white/80">We'll be in touch within 24 hours to schedule your discovery call.</p>
          </div>
        );
      
      default:
        return null;
    }
  };

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

  const isLastStep = currentStep === 5;
  const isThankYouStep = currentStep === 6;

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
              {/* Progress bar */}
              {!isThankYouStep && (
                <div className="h-1 bg-white/10 w-full">
                  <div 
                    className="h-full bg-iris-purple transition-all duration-300 ease-out"
                    style={{ width: `${((currentStep) / 6) * 100}%` }}
                  />
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
                    key={currentStep}
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
              {!isThankYouStep && (
                <div className="p-6 bg-black/20 flex justify-between">
                  <button
                    onClick={handlePrevious}
                    className={`px-6 py-3 rounded-xl transition-colors ${
                      currentStep === 0 
                        ? 'opacity-0 pointer-events-none' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Back
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-iris-purple hover:bg-iris-purple/90 text-white rounded-xl transition-colors"
                  >
                    {isLastStep ? 'Submit' : 'Continue'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TypeformPopup; 