'use client';

import React, { useState } from 'react';
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

interface TypeformPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const TypeformPopup = ({ isOpen, onClose, onSubmit }: TypeformPopupProps) => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setCurrentStep(1); // Reset form
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
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep-navy border border-white/10 rounded-2xl p-8 max-w-xl w-full z-50 shadow-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              className="absolute right-4 top-4 text-white/60 hover:text-white"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Book Your Free Discovery Call</h2>
              <p className="text-white/70">
                Let's discuss how we can help scale your business with predictable, data-driven growth.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white/70 text-sm">Step {currentStep} of {totalSteps}</div>
                <div className="text-white/70 text-sm">{Math.round((currentStep / totalSteps) * 100)}% completed</div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-iris-purple to-mint-green transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="revenue">
                      Current Monthly Revenue
                    </label>
                    <select
                      id="revenue"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="< €10k">Less than €10,000</option>
                      <option value="€10k - €50k">€10,000 - €50,000</option>
                      <option value="€50k - €100k">€50,000 - €100,000</option>
                      <option value="€100k - €500k">€100,000 - €500,000</option>
                      <option value="> €500k">More than €500,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="budget">
                      Monthly Ad Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="< €5k">Less than €5,000</option>
                      <option value="€5k - €15k">€5,000 - €15,000</option>
                      <option value="€15k - €30k">€15,000 - €30,000</option>
                      <option value="€30k - €100k">€30,000 - €100,000</option>
                      <option value="> €100k">More than €100,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="website">
                      Website URL
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="instagram">
                      Instagram Handle (Optional)
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@yourbrand"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-white/90 mb-2" htmlFor="referralSource">
                      How did you hear about us?
                    </label>
                    <select
                      id="referralSource"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-iris-purple/50"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Google">Google Search</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Referral">Referral</option>
                      <option value="Ad">Advertisement</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-4">
                    <h3 className="font-semibold text-white mb-2">What Happens Next?</h3>
                    <ol className="text-white/70 space-y-2 list-decimal pl-4">
                      <li>We'll review your information within 24 hours</li>
                      <li>You'll receive a calendar invite to schedule your call</li>
                      <li>Our team will prepare a custom growth opportunity analysis before we speak</li>
                    </ol>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-transparent border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-iris-purple to-mint-green rounded-lg text-white font-medium"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-iris-purple to-mint-green rounded-lg text-white font-medium"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TypeformPopup; 