'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLeadForm } from '../../contexts/LeadFormContext';

const RiskFreeCta = () => {
  const [spotsLeft] = useState(5);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { openLeadForm, isFormSubmitted } = useLeadForm();

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

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/20 to-deep-navy z-0"></div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="flex flex-col lg:flex-row gap-8 items-center"
        >
          {/* Left Card - Risk Guarantee */}
          <motion.div variants={fadeUp} className="w-full lg:w-1/2">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-glass relative h-full"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="absolute -top-5 left-8 bg-mint-green text-deep-navy px-6 py-2 rounded-full font-semibold text-sm">
                Our Zero-Risk Guarantee
              </div>
              
              <div className="flex items-start gap-4 mt-8 mb-6">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-mint-green flex-shrink-0">
                  <span className="text-mint-green text-xl font-bold">30</span>
                  <span className="absolute -bottom-1 text-white/70 text-xs">Days</span>
                </div>
                <h3 className="text-2xl font-bold mt-2">No Results, No Fee</h3>
              </div>
              
              <p className="text-white/70 mb-8">
                If we don't deliver measurable improvements to your key metrics 
                within the first 30 days, you don't pay a cent. And you keep all 
                the strategy documents, customer insights, and optimization 
                plans we've created.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white">Minimum 20% improvement in primary KPI</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white">No long-term contracts—cancel anytime</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white">You own all deliverables and assets</h4>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white">Weekly metrics reports for full transparency</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Card - CTA */}
          <motion.div variants={fadeUp} className="w-full lg:w-1/2">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Scale Your Brand Profitably?
              </h2>
              <p className="text-white/80 text-lg">
                Limited spots available for this month. Apply now to secure your
                growth strategy session.
              </p>
            </div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-glass"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4 bg-white/5 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-iris-purple/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">30-Minute Discovery Call</h4>
                    <p className="text-white/70 text-sm">
                      Free, no-obligation strategy session
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-iris-purple/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Only {spotsLeft} Spots Left</h4>
                    <p className="text-white/70 text-sm">
                      We limit new clients to ensure quality
                    </p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={openLeadForm}
                className="w-full py-4 bg-gradient-to-r from-iris-purple to-mint-green text-white font-semibold rounded-lg hover:opacity-95 transition-all duration-300"
              >
                Apply Now
              </button>
              
              <p className="mt-4 text-white/60 text-sm text-center">
                {isFormSubmitted ? "Check your email for confirmation details" : "We typically respond within 24 hours"}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RiskFreeCta; 