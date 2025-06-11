'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CtaButton from '../ui/CtaButton';
import { useLeadForm } from '../../contexts/LeadFormContext';

const FinalCta = () => {
  const { openLeadForm } = useLeadForm();
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
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/20 to-deep-navy z-0"></div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="bg-white/10 backdrop-blur-sm p-10 md:p-16 rounded-3xl border border-white/10 shadow-glass"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Scale Your Brand Profitably?
            </h2>
            
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mb-10">
              Take the first step toward predictable, data-driven growth. Book your free discovery call now—no commitment, just clarity on what's possible for your business.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
              <CtaButton 
                text="Book Free Discovery Call" 
                onClick={openLeadForm}
                isSecondary={false}
              />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mint-green">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="text-white/80">
                  <span className="font-semibold">30-minute call</span> · No pitch, just strategy
                </div>
              </div>
            </div>
            
            {/* Trust factors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-bold text-mint-green mb-2">97%</div>
                <div className="text-white/70 text-center">Client retention rate after 6 months</div>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-bold text-mint-green mb-2">48h</div>
                <div className="text-white/70 text-center">Average implementation time for changes</div>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-bold text-mint-green mb-2">173+</div>
                <div className="text-white/70 text-center">DTC brands successfully scaled</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;

// reasoning: The final CTA concentrates all previous persuasion elements (results,
// urgency, social proof) into one final push. The "no pitch, just strategy" text
// removes resistance, while the trust metrics reinforce the agency's credibility.
// The glass card design creates visual prominence and helps the section stand out. 