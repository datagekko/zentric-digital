'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ComparisonSection = () => {
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

  const comparisonPoints = [
    {
      traditional: "Monthly retainer regardless of results",
      zentric: "Performance-based fee structure"
    },
    {
      traditional: "Quarterly campaign reviews",
      zentric: "Weekly optimizations and reporting"
    },
    {
      traditional: "Siloed teams (creative, ads, email)",
      zentric: "Single integrated growth team"
    },
    {
      traditional: "Basic A/B testing (if any)",
      zentric: "Comprehensive multivariate testing"
    },
    {
      traditional: '3-6 month "ramp-up" period',
      zentric: "Results in 30 days or you don't pay"
    }
  ];

  return (
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The Zentric Difference
            </h2>
            <p className="text-white/80 text-lg">
              See how our data-driven, results-focused approach contrasts with traditional agency models.
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Headers */}
              <div className="bg-white/10 p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white/80">Traditional Agency</h3>
              </div>
              <div className="bg-iris-purple p-6 border-b border-iris-purple/30">
                <h3 className="text-xl font-bold">Zentric System</h3>
              </div>
              
              {/* Comparison Rows */}
              {comparisonPoints.map((point, index) => (
                <React.Fragment key={index}>
                  <div className={`p-6 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'} flex items-center`}>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-white/50">✗</span>
                      </div>
                      <span className="text-white/80">{point.traditional}</span>
                    </div>
                  </div>
                  <div className={`p-6 ${index % 2 === 0 ? 'bg-iris-purple/20' : 'bg-transparent'} flex items-center`}>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span>{point.zentric}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Key Advantage */}
          <motion.div variants={fadeUp} className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Your Key Advantage</h3>
                <p className="text-white/80 mb-6">
                  With Zentric, you're not just buying services—you're partnering with a team that's financially incentivized to maximize your success. We only win when you win.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-mint-green/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Aligned Incentives</div>
                    <div className="text-white/60 text-sm">Pay for performance, not promises</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-iris-purple/20 rounded-xl p-6 text-center">
                <div className="text-xs text-white/60 uppercase tracking-wider mb-2">CLIENT RETENTION</div>
                <div className="text-5xl font-bold text-mint-green mb-2">97%</div>
                <div className="text-white/70">After 6 months</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;

// reasoning: This comparison section directly addresses objections by contrasting
// Zentric's approach with traditional agencies. The side-by-side format makes the
// differences immediately apparent, and the visual cues (checkmarks vs X marks)
// reinforce the positive/negative contrast. The retention metric adds social proof
// and credibility, while highlighting the aligned incentives reduces perceived risk. 