'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { Button } from '../ui/button';

const FinalCTA = () => {
  const [spotsLeft] = useState(5);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { openLeadForm, isFormSubmitted } = useLeadForm();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-black/30 z-0" />
      <div ref={ref} className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="flex flex-col lg:flex-row gap-8 items-stretch"
        >
          {/* Left Card - Risk Guarantee */}
          <motion.div variants={item} className="w-full lg:w-1/2 flex">
            <div className="glass-card p-8 w-full h-full flex flex-col">
              <div className="absolute -top-4 left-8 bg-primary text-primary-foreground px-5 py-1.5 rounded-full font-semibold text-sm">
                Our Zero-Risk Guarantee
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-2 text-foreground">Pay for Results, Not Promises</h3>
              <p className="text-muted-foreground mb-6">
                Our success is tied directly to yours. We're so confident in our ability to drive growth that we offer a unique performance-based model.
              </p>
              <div className="space-y-4 mt-auto">
                {[
                  'Starts from €1,500/month',
                  'No markup on ad spend - ever',
                  'Revenue-share only on the new revenue we generate',
                  'If after 2 months we don\'t hit 3x ROAS, we cut the retainer until we do.',
                ].map((guarantee) => (
                  <div key={guarantee} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 bg-primary/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="font-medium text-foreground">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Card - CTA */}
          <motion.div variants={item} className="w-full lg:w-1/2 flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Scale Profitably?</h2>
              <p className="text-muted-foreground text-lg">
                Limited spots available. Secure your growth strategy session now.
              </p>
            </div>
            
            <div className="glass-card p-8 flex-grow flex flex-col justify-between h-full">
              <div className="space-y-4 mb-8">
                {[
                    { icon: 'clock', title: `30-Min Discovery Call`, subtitle: 'Free, no-obligation strategy session' },
                    { icon: 'shield', title: `Only ${spotsLeft} Spots Left`, subtitle: 'We limit clients to ensure quality' }
                ].map((point, i) => (
                    <div key={i} className="flex items-center gap-4 bg-black/20 rounded-xl p-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                           {point.icon === 'clock' ? 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                           }
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground text-lg">{point.title}</h4>
                            <p className="text-muted-foreground text-sm">{point.subtitle}</p>
                        </div>
                    </div>
                ))}
              </div>
              
              <div className="mt-auto">
                <Button variant="primary" size="lg" className="w-full" onClick={openLeadForm}>
                    Book a Free Discovery Call
                </Button>
                <p className="mt-4 text-muted-foreground text-sm text-center">
                  {isFormSubmitted ? "Check your email for confirmation details." : "We typically respond within one business day."}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;