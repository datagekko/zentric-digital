'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../ui/button';
import { useLeadForm } from '../../contexts/LeadFormContext';

const SolutionSection = () => {
  const { openLeadForm } = useLeadForm();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const advantages = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>,
      title: "Aligned Incentives",
      description: "Pay for performance, not promises."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18.27-1.45-1.45-2.2-2.2a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41l2.2 2.2 1.45 1.45a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41z"/><path d="m14 7 3 3-6 6-4-4 6-6"/><path d="m7 11-3 3 3 3"/></svg>,
      title: "Full Creative & Data Ownership",
      description: "You own all ad creatives and data, no strings attached."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      title: "4-Hour Response Time",
      description: "Guaranteed fast communication during business hours."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/></svg>,
      title: "Transparent Pricing",
      description: "From €1,500/mo, rev-share on new revenue, no ad spend markup."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
      title: "Real-Time Analytics Dashboard",
      description: "Track spend, revenue, and ROAS with our proprietary dashboard."
    }
  ];

  const services = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>,
      title: "Meta Paid Advertising",
      description: "Strategic campaign management to maximize ROAS across Facebook, Instagram and more."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
      title: "CRO Optimization Sprints",
      description: "On-site copy, layout and offer-sequencing tests to improve conversion rates throughout your funnel."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
      title: "AI-Powered Creative Engine",
      description: "Rapid ad variants in less than 48 hours, continuously tested and optimized for maximum performance."
    }
  ]

  return (
    <section id="solution" className="py-20 overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="space-y-16"
        >
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold">
              The Zentric Growth Engine
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-4 md:whitespace-nowrap">
            The growth engine that delivers: Increased traffic, streamlined funnels, better ads, higher ROAS.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className="glass-card p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto text-primary">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={item} 
            className="glass-card p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Our Unfair Advantage</h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  With Zentric, you're not just buying services - you're partnering with a team financially incentivized to maximize your success. If we don't lift your blended ROAS in 90 days, you stop paying until we do.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary mt-1">
                        {advantage.icon}
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-md">{advantage.title}</div>
                        <div className="text-muted-foreground text-sm">{advantage.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/3 text-center mt-8 md:mt-0">
                  <div className="text-sm text-primary uppercase tracking-wider mb-2 font-semibold">MINIMUM ROAS GUARANTEE</div>
                  <div className="text-6xl font-bold text-foreground mb-4">
                    3x
                  </div>
                  <Button variant="secondaryBrand" size="lg" onClick={openLeadForm}>
                    Learn More
                  </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection; 