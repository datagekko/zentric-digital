'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CtaButton from '../ui/CtaButton';

const OfferStack = () => {
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
    <section className="py-24 bg-nordic-ivory text-onyx relative overflow-hidden" id="offer-layout-1">
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <span className="text-iris-purple font-medium uppercase tracking-wider text-sm">Zero Setup Fee</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-3">
              Precision-Driven Growth Engine
            </h2>
            <p className="text-deep-navy/80 text-xl">
              For lifestyle brands seeking predictable revenue with a <span className="font-bold">minimum 3× blended ROAS in 90 days</span>.
            </p>
          </motion.div>

          {/* Main Offer Card */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl shadow-lg p-1 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-10">
                {/* Left Column - What You Get */}
                <div className="flex-1 space-y-8">
                  <h3 className="text-2xl font-bold text-deep-navy">What You Get</h3>
                  
                  <div className="space-y-5">
                    {/* Service 1 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-iris-purple/10 flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Meta & TikTok Paid Media</h4>
                        <p className="text-deep-navy/70">Strategic campaign management to maximize ROAS</p>
                      </div>
                    </div>
                    
                    {/* Service 2 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-iris-purple/10 flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">CRO Optimization Sprints</h4>
                        <p className="text-deep-navy/70">On-site copy, layout and offer-sequencing tests</p>
                      </div>
                    </div>
                    
                    {/* Service 3 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-iris-purple/10 flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">AI-Powered Creative Engine</h4>
                        <p className="text-deep-navy/70">Rapid ad variants in less than 48 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Bonuses & Guarantee */}
                <div className="flex-1 space-y-8">
                  <h3 className="text-2xl font-bold text-deep-navy">Included Bonuses</h3>
                  
                  <div className="space-y-5">
                    {/* Bonus 1 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-mint-green/10 flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#53DD6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Landing-Page Copy Polish</h4>
                        <p className="text-deep-navy/70">Hero section rewritten for clarity & conversion</p>
                      </div>
                    </div>
                    
                    {/* Bonus 2 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-mint-green/10 flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#53DD6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Rapid-Win CRO Checklist</h4>
                        <p className="text-deep-navy/70">25-point friction-killer punch list, prioritized</p>
                      </div>
                    </div>
                    
                    {/* Bonus 3 */}
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-mint-green/10 flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#53DD6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">48-Hour Creative Blast</h4>
                        <p className="text-deep-navy/70">Three ad concepts shipped in the first two days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Guarantees */}
              <div className="mt-12 border-t border-gray-200 pt-10">
                <h3 className="text-2xl font-bold text-deep-navy mb-6">Our Guarantees</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Guarantee 1 */}
                  <div className="bg-nordic-ivory rounded-xl p-4">
                    <h4 className="font-bold text-iris-purple">Creative Blast SLA</h4>
                    <p className="text-sm text-deep-navy/80 mt-1">Testing ad set live within 48 hours</p>
                  </div>
                  
                  {/* Guarantee 2 */}
                  <div className="bg-nordic-ivory rounded-xl p-4">
                    <h4 className="font-bold text-iris-purple">3× ROAS Pledge</h4>
                    <p className="text-sm text-deep-navy/80 mt-1">Or we work free until target is achieved</p>
                  </div>
                  
                  {/* Guarantee 3 */}
                  <div className="bg-nordic-ivory rounded-xl p-4">
                    <h4 className="font-bold text-iris-purple">No-Lock-In Exit</h4>
                    <p className="text-sm text-deep-navy/80 mt-1">Leave with 15-day notice after 90 days</p>
                  </div>
                  
                  {/* Guarantee 4 */}
                  <div className="bg-nordic-ivory rounded-xl p-4">
                    <h4 className="font-bold text-iris-purple">Zero-Spend Mark-Up</h4>
                    <p className="text-sm text-deep-navy/80 mt-1">We never skim ad budget, guaranteed</p>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="mt-12 text-center">
                <CtaButton 
                  text="Book Free Discovery Call" 
                  onClick={() => console.log('Offer CTA clicked')}
                  isSecondary={false}
                />
                <p className="mt-4 text-deep-navy/60 text-sm">No obligation. 30-minute fit check call.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferStack;

// reasoning: This section uses value-based pricing and the Goldilocks principle
// with three options, highlighting the middle one as "most popular" to guide choice.
// The inclusion of a performance-based fee structure (% of revenue over baseline)
// creates incentive alignment and reduces perceived risk for the client. 