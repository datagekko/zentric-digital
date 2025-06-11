'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SolutionSection from '../sections/SolutionSection';
import TypeformPopup from '../ui/TypeformPopup';

const PasSlab = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // State for animations
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // State for form popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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

  // Checkmark animation
  const checkmarkAnimation = {
    initial: { scale: 1, opacity: 0.7 },
    animate: { 
      scale: [1, 1.3, 1],
      opacity: 1,
      transition: { 
        duration: 0.5,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    }
  };

  // Row slide animation
  const rightSlideAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const leftSlideAnimation = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  // Structure the comparison points with main text and highlight parts
  const comparisonPoints = [
    {
      traditional: "12-month binding contracts",
      zentric: {
        main: "No lock-in contracts",
        highlight: " — exit with 15 days' notice"
      }
    },
    {
      traditional: "Siloed teams (creative, ads, email)",
      zentric: {
        main: "Founder-level strategists",
        highlight: " + AI creative engine"
      }
    },
    {
      traditional: "Account manager as primary contact point",
      zentric: {
        main: "Text the founders directly",
        highlight: " — weekly strategy calls"
      }
    },
    {
      traditional: "20% commission on ad spend + monthly fees",
      zentric: {
        main: "100% transparent pricing",
        highlight: " — we profit when you profit"
      }
    },
    {
      traditional: "€8k+ monthly retainer regardless of results",
      zentric: {
        main: "Pay for results only",
        highlight: " — we cut the retainer until 3× ROAS hit"
      }
    }
  ];

  return (
    <>
    {/* Challenge Section */}
    <section id="challenge" className="py-20 bg-deep-navy text-white relative scroll-mt-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 z-0"></div>
      
      {/* Animated gradient accent */}
      <motion.div 
        className="absolute top-0 right-0 w-1/3 h-40 bg-gradient-to-r from-iris-purple/30 to-mint-green/30 blur-3xl rounded-full"
        animate={{
          x: [50, 0, 50],
          y: [0, 30, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div ref={ref} className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          {/* Headline and Subheadline */}
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              E-commerce Businesses Deserve Better
            </h2>
            <motion.p 
              className="text-xl text-white/80 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              For e-com businesses seeking predictable revenue with a minimum 
              <motion.span 
                className="font-bold text-mint-green mx-1 inline-block"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  scale: [1, 1.15, 1],
                  transition: { 
                    delay: 0.7, 
                    duration: 0.8,
                    times: [0, 0.5, 1],
                    ease: "easeInOut" 
                  }
                }}
              >
                3× blended ROAS
              </motion.span> 
              in 90 days.
            </motion.p>
          </motion.div>

          {/* Comparison Table - New Mobile-Friendly Design */}
          <motion.div 
            variants={fadeUp} 
            className="overflow-hidden rounded-2xl shadow-lg bg-deep-navy/50 backdrop-blur-sm border border-white/10"
          >
            {/* Table Headers - Visible on desktop, hidden on smallest screens */}
            <div className="hidden sm:grid grid-cols-2">
              <div className="bg-white/10 p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white/80">Traditional Agency</h3>
              </div>
              <motion.div 
                className="bg-iris-purple p-6 border-b border-iris-purple/30"
                initial={{ backgroundColor: "rgba(99, 91, 255, 0.4)" }}
                animate={{ 
                  backgroundColor: ["rgba(99, 91, 255, 0.4)", "rgba(99, 91, 255, 0.6)", "rgba(99, 91, 255, 0.4)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h3 className="text-xl font-bold">Zentric Growth Engine</h3>
              </motion.div>
            </div>
            
            {/* Mobile Header - Visible only on smallest screens */}
            <div className="sm:hidden flex">
              <div className="w-1/2 bg-white/10 py-4 px-3 border-b border-white/10 flex items-center justify-center">
                <h3 className="text-base font-bold text-white/80 text-center">Traditional Agency</h3>
              </div>
              <motion.div 
                className="w-1/2 bg-iris-purple py-4 px-3 border-b border-iris-purple/30 flex items-center justify-center"
                initial={{ backgroundColor: "rgba(99, 91, 255, 0.4)" }}
                animate={{ 
                  backgroundColor: ["rgba(99, 91, 255, 0.4)", "rgba(99, 91, 255, 0.6)", "rgba(99, 91, 255, 0.4)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h3 className="text-base font-bold text-center">Zentric Growth</h3>
              </motion.div>
            </div>
            
            {/* Comparison Rows - Optimized for both mobile and desktop */}
            {comparisonPoints.map((point, index) => (
              <div key={index} className="grid grid-cols-2 relative">
                {/* Traditional Agency Column */}
                <motion.div 
                  className={`px-3 py-4 sm:p-6 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} transition-all duration-300 opacity-60 relative`}
                  variants={rightSlideAnimation}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  animate={activeIndex === index ? { opacity: 0.3 } : { opacity: 0.6 }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 shadow-sm">
                      <span className="text-xs font-bold text-red-500">✕</span>
                    </div>
                    <span className="text-sm sm:text-base text-white/80">{point.traditional}</span>
                  </div>
                </motion.div>
                
                {/* Zentric Column */}
                <motion.div 
                  className={`px-3 py-4 sm:p-6 ${index % 2 === 0 ? 'bg-iris-purple/10' : 'bg-iris-purple/5'} transition-all duration-300 relative`}
                  variants={leftSlideAnimation}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  whileHover={{ 
                    backgroundColor: "rgba(99, 91, 255, 0.2)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Highlight effect on hover */}
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-iris-purple/10 to-mint-green/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-start gap-2 sm:gap-3 relative z-10">
                    <motion.div 
                      className="min-w-5 w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5 shadow-sm"
                      variants={checkmarkAnimation}
                      initial="initial"
                      animate={activeIndex === index ? "animate" : "initial"}
                    >
                      <span className="text-xs font-bold text-mint-green">✓</span>
                    </motion.div>
                    <span className="flex flex-col sm:flex-row">
                      <motion.span 
                        className="bg-clip-text text-transparent bg-gradient-to-br from-iris-purple to-mint-green font-medium text-sm sm:text-base"
                        initial={{ opacity: 0.9 }}
                        animate={activeIndex === index ? 
                          { opacity: 1, scale: 1.02 } : 
                          { opacity: 0.9, scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        {point.zentric.main}
                      </motion.span>
                      <span className="text-sm sm:text-base text-white">{point.zentric.highlight}</span>
                    </span>
                  </div>
                </motion.div>
                
                {/* Mobile separator line */}
                {index < comparisonPoints.length - 1 && (
                  <div className="col-span-2 h-px bg-white/10 sm:hidden"></div>
                )}
              </div>
            ))}

            {/* Mobile CTA to open lead form */}
            <div 
              onClick={() => setIsPopupOpen(true)}
              className="sm:hidden p-4 bg-gradient-to-r from-iris-purple/20 to-mint-green/20 text-center cursor-pointer hover:from-iris-purple/30 hover:to-mint-green/30 transition-all duration-300"
            >
              <div className="w-full py-3 px-4 text-white font-medium text-sm">
                Book a Free Discovery Call
              </div>
            </div>
            
            {/* Desktop CTA to open lead form */}
            <div 
              onClick={() => setIsPopupOpen(true)}
              className="hidden sm:block p-5 bg-gradient-to-r from-iris-purple/20 to-mint-green/20 text-center border-t border-white/10 cursor-pointer hover:from-iris-purple/30 hover:to-mint-green/30 transition-all duration-300"
            >
              <div className="px-8 py-4 text-white font-medium">
                Book a Free Discovery Call
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    
    {/* Import the Solution Section as a separate component */}
    <SolutionSection />

    {/* Typeform Popup */}
    <TypeformPopup 
      isOpen={isPopupOpen} 
      onClose={() => setIsPopupOpen(false)} 
      onSubmit={(data) => {
        console.log('Form submitted:', data);
        // Here you would typically send the data to your backend
        setIsPopupOpen(false);
        setIsFormSubmitted(true);
      }} 
    />
    </>
  );
};

export default PasSlab;

// reasoning: This section follows the Problem-Agitation-Solution copywriting framework.
// It establishes clear pain points, agitates them by contrasting with typical agency behavior,
// then presents Zentric's solution. The contrast box with specific metrics (3× ROAS)
// provides quantifiable proof, building credibility and desire. 