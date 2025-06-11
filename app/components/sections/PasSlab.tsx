'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PasSlab = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // State for animations
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isGuaranteeHovered, setIsGuaranteeHovered] = useState(false);

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

  // Pulse animation for CTA elements
  const pulseAnimation = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
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
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
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

          {/* Comparison Table */}
          <motion.div 
            variants={fadeUp} 
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Headers */}
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
              
              {/* Comparison Rows */}
              <div className="contents">
                {comparisonPoints.map((point, index) => (
                  <React.Fragment key={index}>
                    {/* Traditional Agency Column */}
                    <motion.div 
                      className={`p-6 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} flex items-center transition-all duration-300 opacity-60`}
                      variants={rightSlideAnimation}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      animate={activeIndex === index ? { opacity: 0.3 } : { opacity: 0.6 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 shadow-sm">
                          <span className="text-xs font-bold text-red-500">✕</span>
                        </div>
                        <span className="text-white/80">{point.traditional}</span>
                      </div>
                    </motion.div>
                    
                    {/* Zentric Column */}
                    <motion.div 
                      className={`p-6 ${index % 2 === 0 ? 'bg-iris-purple/10' : 'bg-iris-purple/5'} flex items-center transition-all duration-300 relative`}
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
                      
                      <div className="flex items-start gap-3 relative z-10">
                        <motion.div 
                          className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5 shadow-sm"
                          variants={checkmarkAnimation}
                          initial="initial"
                          animate={activeIndex === index ? "animate" : "initial"}
                        >
                          <span className="text-xs font-bold text-mint-green">✓</span>
                        </motion.div>
                        <span>
                          <motion.span 
                            className="bg-clip-text text-transparent bg-gradient-to-br from-iris-purple to-mint-green font-medium"
                            initial={{ opacity: 0.9 }}
                            animate={activeIndex === index ? 
                              { opacity: 1, scale: 1.02 } : 
                              { opacity: 0.9, scale: 1 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {point.zentric.main}
                          </motion.span>
                          <span className="text-white">{point.zentric.highlight}</span>
                        </span>
                      </div>
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Advantage */}
          <motion.div 
            variants={fadeUp} 
            className="bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/8 hover:border-white/20 relative"
          >
            {/* Subtle animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-iris-purple/5 to-mint-green/5 rounded-2xl opacity-0"
              animate={{ 
                opacity: [0, 0.5, 0],
                transition: { 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }
              }}
            />
            
            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-white">Your Key Advantage</h3>
                <p className="text-white/80 mb-6">
                  With Zentric.digital, you're not just buying services—you're partnering with a team that's financially incentivized to maximize your success. If we don't lift your blended ROAS in 60 days, you stop paying until we do.
                </p>
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-mint-green/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(83, 221, 108, 0.2)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white">Aligned Incentives</div>
                    <div className="text-white/60 text-sm">Pay for performance, not promises</div>
                  </div>
                </motion.div>
              </div>
              <motion.div 
                className="md:w-1/3 bg-iris-purple/20 rounded-xl p-6 text-center relative overflow-hidden"
                variants={pulseAnimation}
                initial="initial"
                animate="pulse"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(99, 91, 255, 0.2)",
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setIsGuaranteeHovered(true)}
                onMouseLeave={() => setIsGuaranteeHovered(false)}
              >
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-iris-purple/20 via-mint-green/20 to-iris-purple/20 blur-lg opacity-0"
                  animate={isGuaranteeHovered ? 
                    { 
                      opacity: 1,
                      x: [0, 100, 0],
                      transition: { 
                        opacity: { duration: 0.3 },
                        x: { duration: 3, repeat: Infinity, ease: "linear" }
                      }
                    } : 
                    { opacity: 0 }
                  }
                />
                
                <div className="relative z-10">
                  <div className="text-xs text-white/60 uppercase tracking-wider mb-2">MINIMUM ROAS GUARANTEE</div>
                  <motion.div 
                    className="text-5xl font-bold text-mint-green mb-2"
                    animate={isGuaranteeHovered ? 
                      { 
                        scale: [1, 1.1, 1],
                        textShadow: "0 0 8px rgba(83, 221, 108, 0.4)",
                        transition: { 
                          duration: 0.5, 
                          times: [0, 0.5, 1],
                          ease: "easeInOut" 
                        }
                      } : {}
                    }
                  >
                    3×
                  </motion.div>
                  <div className="text-white/70">In 90 days or you don't pay</div>
                  
                  <AnimatePresence>
                    {isGuaranteeHovered && (
                      <motion.div
                        className="mt-4 pt-4 border-t border-white/10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="text-sm text-white/80 block"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          No risk, all reward. Get started today.
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PasSlab;

// reasoning: This section follows the Problem-Agitation-Solution copywriting framework.
// It establishes clear pain points, agitates them by contrasting with typical agency behavior,
// then presents Zentric's solution. The contrast box with specific metrics (1.8x vs 4.2x ROAS)
// provides quantifiable proof, building credibility and desire. 