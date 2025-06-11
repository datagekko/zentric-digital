'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SolutionSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for animations
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

  return (
    <section id="solution" className="min-h-screen py-20 bg-onyx text-white relative scroll-mt-24 overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 z-0"></div>
      
      {/* Animated gradient accent */}
      <motion.div 
        className="absolute bottom-0 left-0 w-1/3 h-40 bg-gradient-to-r from-mint-green/30 to-iris-purple/30 blur-3xl rounded-full"
        animate={{
          x: [-50, 0, -50],
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
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          {/* Solution Headline */}
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              The Zentric Growth Engine
            </h2>
            <p className="text-xl text-white max-w-4xl mx-auto">
              A complete system to drive predictable revenue growth with a guaranteed
              <motion.span 
                className="font-bold bg-mint-green text-onyx px-2 py-0.5 rounded mx-1 inline-block"
                initial={{ opacity: 1 }}
                animate={{ 
                  scale: [1, 1.15, 1],
                  transition: { 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 5,
                    times: [0, 0.5, 1],
                    ease: "easeInOut" 
                  }
                }}
              >
                3× blended ROAS
              </motion.span> 
              in 90 days or you don't pay.
            </p>
          </motion.div>
          
          {/* What You Get Section */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Meta Paid Advertising */}
            <motion.div 
              className="bg-deep-navy p-8 rounded-2xl border border-iris-purple/30 hover:bg-deep-navy/80 hover:border-iris-purple/50 transition-all duration-300"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(99, 91, 255, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 rounded-full bg-iris-purple/40 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 20V10"></path>
                  <path d="M18 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Meta Paid Advertising</h3>
              <p className="text-white/90">Strategic campaign management to maximize ROAS across Facebook, Instagram and more.</p>
            </motion.div>
            
            {/* CRO Optimization Sprints */}
            <motion.div 
              className="bg-deep-navy p-8 rounded-2xl border border-iris-purple/30 hover:bg-deep-navy/80 hover:border-iris-purple/50 transition-all duration-300"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(99, 91, 255, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 rounded-full bg-iris-purple/40 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">CRO Optimization Sprints</h3>
              <p className="text-white/90">On-site copy, layout and offer-sequencing tests to improve conversion rates throughout your funnel.</p>
            </motion.div>
            
            {/* AI-Powered Creative Engine */}
            <motion.div 
              className="bg-deep-navy p-8 rounded-2xl border border-iris-purple/30 hover:bg-deep-navy/80 hover:border-iris-purple/50 transition-all duration-300"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(99, 91, 255, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="w-12 h-12 rounded-full bg-iris-purple/40 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI-Powered Creative Engine</h3>
              <p className="text-white/90">Rapid ad variants in less than 48 hours, continuously tested and optimized for maximum performance.</p>
            </motion.div>
          </motion.div>
          
          {/* Key Advantage */}
          <motion.div 
            variants={fadeUp} 
            className="bg-deep-navy p-8 rounded-2xl border border-iris-purple/30 transition-all duration-300 hover:bg-deep-navy/80 hover:border-iris-purple/50 relative"
          >
            {/* Subtle animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-iris-purple/10 to-mint-green/10 rounded-2xl opacity-0"
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
                <p className="text-white mb-6">
                  With Zentric.digital, you're not just buying services—you're partnering with a team that's financially incentivized to maximize your success. If we don't lift your blended ROAS in 60 days, you stop paying until we do.
                </p>
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 1, y: 0 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-mint-green/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(83, 221, 108, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white">Aligned Incentives</div>
                    <div className="text-white/80 text-sm">Pay for performance, not promises</div>
                  </div>
                </motion.div>
              </div>
              <motion.div 
                className="md:w-1/3 bg-iris-purple/40 rounded-xl p-6 text-center relative overflow-hidden shadow-lg border border-iris-purple/50"
                variants={pulseAnimation}
                initial="initial"
                animate="pulse"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(99, 91, 255, 0.3)",
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setIsGuaranteeHovered(true)}
                onMouseLeave={() => setIsGuaranteeHovered(false)}
              >
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-iris-purple/30 via-mint-green/30 to-iris-purple/30 blur-lg opacity-0"
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
                  <div className="text-xs text-white uppercase tracking-wider mb-2 font-medium">MINIMUM ROAS GUARANTEE</div>
                  <motion.div 
                    className="text-5xl font-bold bg-mint-green text-onyx inline-block px-4 py-1 rounded mb-2"
                    animate={isGuaranteeHovered ? 
                      { 
                        scale: [1, 1.1, 1],
                        boxShadow: "0 0 20px rgba(83, 221, 108, 0.4)",
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
                  <div className="text-white mt-2">In 90 days or you don't pay</div>
                  
                  <AnimatePresence>
                    {isGuaranteeHovered && (
                      <motion.div
                        className="mt-4 pt-4 border-t border-white/20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span 
                          className="text-sm text-white block"
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

export default SolutionSection; 