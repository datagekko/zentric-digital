'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import CtaButton from '../ui/CtaButton';
import TypeformPopup from '../ui/TypeformPopup';

const RiskFreeCta = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="py-24 bg-deep-navy text-white relative overflow-hidden">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/20 to-deep-navy z-0"></div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          {/* Left Column: Risk-Free Guarantee */}
          <motion.div 
            variants={fadeUp} 
            className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-glass h-full"
          >
            <h3 className="text-2xl font-bold mb-6">Our Zero-Risk Guarantee</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-iris-purple to-mint-green flex items-center justify-center p-0.5">
                <div className="w-full h-full rounded-full bg-deep-navy flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-mint-green text-xl font-bold">30</div>
                    <div className="text-white/80 text-xs">Days</div>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-semibold">No Results, No Fee</h4>
            </div>
            
            <p className="text-white/80 mb-8">
              If we don't deliver measurable improvements to your key metrics within the first 30 days, you don't pay a cent. And you keep all the strategy documents, customer insights, and optimization plans we've created.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint-green flex items-center justify-center mt-0.5">
                  <span className="text-xs text-deep-navy">✓</span>
                </div>
                <span className="text-white/80">Minimum 20% improvement in primary KPI</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint-green flex items-center justify-center mt-0.5">
                  <span className="text-xs text-deep-navy">✓</span>
                </div>
                <span className="text-white/80">No long-term contracts—cancel anytime</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint-green flex items-center justify-center mt-0.5">
                  <span className="text-xs text-deep-navy">✓</span>
                </div>
                <span className="text-white/80">You own all deliverables and assets</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-mint-green flex items-center justify-center mt-0.5">
                  <span className="text-xs text-deep-navy">✓</span>
                </div>
                <span className="text-white/80">Weekly metrics reports for full transparency</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: CTA */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-col justify-center h-full"  
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Scale Your Brand Profitably?
              </h2>
              <p className="text-white/80 text-lg">
                Limited spots available for this month. Apply now to secure your growth strategy session.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 mb-6">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-mint-green/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">30-Minute Discovery Call</div>
                    <div className="text-white/60 text-sm">Free, no-obligation strategy session</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-mint-green/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Only 5 Spots Left</div>
                    <div className="text-white/60 text-sm">We limit new clients to ensure quality</div>
                  </div>
                </div>
              </div>
            </div>
            
            {isFormSubmitted ? (
              <div className="bg-mint-green/20 border border-mint-green rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mint-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-mint-green">Application Submitted!</span>
                </div>
                <p className="text-white/80 text-sm">
                  Thank you for applying. We'll be in touch within 24 hours to schedule your discovery call.
                </p>
              </div>
            ) : (
              <CtaButton 
                text="Apply Now" 
                onClick={() => setIsPopupOpen(true)}
                isSecondary={false}
                className="w-full"
              />
            )}
            
            <p className="mt-4 text-white/60 text-sm text-center">
              {isFormSubmitted ? "Check your email for confirmation details" : "We typically respond within 24 hours"}
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Typeform Popup */}
      <TypeformPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onSubmit={(data) => {
          console.log('Form submitted:', data);
          // Here you would typically send the data to your backend
          setIsPopupOpen(false);
          setIsFormSubmitted(true);
          
          // You could also add code here to send the data to your backend API
          // For example:
          // fetch('/api/submit-application', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(data)
          // });
        }} 
      />
    </section>
  );
};

export default RiskFreeCta; 