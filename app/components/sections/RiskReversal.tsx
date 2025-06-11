'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CtaButton from '../ui/CtaButton';
import { useLeadForm } from '../../contexts/LeadFormContext';

const RiskReversal = () => {
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
    <section className="py-20 bg-nordic-ivory relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/5 to-mint-green/5 z-0"></div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Zero-Risk Guarantee
            </h2>
            <p className="text-deep-navy/80 text-lg">
              We're so confident in our ability to drive results that we've completely reversed the risk.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-10 rounded-3xl shadow-sm border border-deep-navy/5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-iris-purple to-mint-green flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-iris-purple text-5xl font-bold mb-2">30</div>
                      <div className="text-deep-navy font-semibold">Day Guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">No Results, No Fee</h3>
                <p className="text-deep-navy/80 mb-6">
                  If we don't deliver measurable improvements to your key metrics within the first 30 days, you don't pay a cent. And you keep all the strategy documents, customer insights, and optimization plans we've created.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span className="text-deep-navy/80">Minimum 20% improvement in primary KPI</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span className="text-deep-navy/80">No long-term contracts—cancel anytime</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span className="text-deep-navy/80">You own all deliverables and assets</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-deep-navy/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-deep-navy/5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-deep-navy">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Full Transparency</div>
                      <div className="text-deep-navy/60 text-sm">Weekly metrics reports—you always know where you stand</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="text-center">
            <CtaButton 
              text="Book Free Discovery Call" 
              onClick={openLeadForm}
              isSecondary={false}
            />
            <p className="mt-4 text-deep-navy/60 text-sm">
              Limited availability: We only take on 5 new clients per month
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RiskReversal;

// reasoning: This section addresses the biggest objection (risk) by turning it into
// a benefit. The 30-day guarantee with a clear "No Results, No Fee" policy removes
// the perceived risk of engaging with Zentric. The addition of scarcity ("only take
// on 5 new clients per month") creates urgency and increases conversion probability. 