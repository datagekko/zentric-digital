'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { Button } from '../ui/button';

const Comparison = () => {
  const { openLeadForm } = useLeadForm();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const comparisonPoints = [
    {
      feature: 'Contract Terms',
      traditional: "12-month binding contracts",
      zentric: "No lock-in, leave after 90 days"
    },
    {
      feature: 'Team Structure',
      traditional: "Siloed teams (creative, ads, email)",
      zentric: "Founder-level strategists + AI creative engine"
    },
    {
      feature: 'Communication',
      traditional: "Account manager as primary contact",
      zentric: "Text the founders directly, weekly strategy calls"
    },
    {
      feature: 'Pricing Model',
      traditional: "20% commission on ad spend + monthly fees",
      zentric: "Transparent rev-share, we profit when you do"
    },
    {
      feature: 'Performance Guarantee',
      traditional: "€8k+ monthly retainer regardless of results",
      zentric: "Pay for results only—we cut the retainer until 3x ROAS is hit"
    }
  ];

  return (
    <section id="challenge" className="py-20 overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="space-y-16"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold">
              E-commerce Businesses Deserve Better
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-4">
              Tired of long contracts, poor communication, and misaligned incentives? We built Zentric to be the partner we wish we had.
            </p>
          </motion.div>

          <motion.div 
            variants={item} 
            className="glass-card overflow-hidden"
          >
            <div className="flex bg-black/10">
              <div className="w-1/3 p-4 font-semibold text-foreground hidden md:block">Feature</div>
              <div className="w-1/3 md:w-1/3 p-4 font-semibold text-muted-foreground">Traditional Agency</div>
              <div className="w-2/3 md:w-1/3 p-4 font-semibold text-foreground bg-primary/10">Zentric Growth Engine</div>
            </div>
            
            <div>
              {comparisonPoints.map((point, index) => (
                <div key={index} className="flex border-t border-white/5">
                  <div className="w-1/3 p-4 text-foreground font-medium hidden md:flex items-center">{point.feature}</div>
                  <div className="w-1/2 md:w-1/3 p-4 text-muted-foreground flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive/50 mr-2 flex-shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    {point.traditional}
                  </div>
                  <div className="w-1/2 md:w-1/3 p-4 text-foreground flex items-center bg-primary/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span className="font-semibold">{point.zentric}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="text-center">
            <Button size="lg" variant="primary" onClick={openLeadForm}>
              Experience the Difference
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;

// reasoning: This section follows the Problem-Agitation-Solution copywriting framework.
// It establishes clear pain points, agitates them by contrasting with typical agency behavior,
// then presents Zentric's solution. The contrast box with specific metrics (3× ROAS)
// provides quantifiable proof, building credibility and desire. 