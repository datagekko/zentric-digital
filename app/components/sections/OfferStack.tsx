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
    <section className="py-20 bg-deep-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 z-0"></div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The Zentric Growth System
            </h2>
            <p className="text-white/80 text-lg">
              One integrated system—not three disjointed services. We operate at the intersection of CRO, paid media, and customer lifecycle to create compounding growth.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Package 1 - Most Popular */}
            <div className="bg-gradient-to-b from-iris-purple/20 to-iris-purple/5 rounded-3xl p-1">
              <div className="glass h-full p-6 md:p-8 rounded-[22px] flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">Full Funnel</h3>
                  <span className="bg-iris-purple text-white text-xs px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-bold">€4,997</span>
                    <span className="text-white/60 mb-1">/mo</span>
                  </div>
                  <p className="text-white/60 text-sm">+ 5% of revenue over baseline</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Complete Meta Ads management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Weekly optimization of store UX</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Full lifecycle email system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Unlimited creative production</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Weekly strategy calls</span>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <CtaButton 
                    text="Book Free Discovery Call" 
                    onClick={() => console.log('Offer CTA clicked')}
                    isSecondary={false}
                  />
                </div>
              </div>
            </div>
            
            {/* Package 2 */}
            <div className="bg-white/5 rounded-3xl p-1">
              <div className="glass h-full p-6 md:p-8 rounded-[22px] flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">Ads Accelerator</h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-bold">€2,497</span>
                    <span className="text-white/60 mb-1">/mo</span>
                  </div>
                  <p className="text-white/60 text-sm">+ 8% of revenue over baseline</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Complete Meta Ads management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Basic landing page optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Bi-weekly creative production</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">✗</span>
                    </div>
                    <span>Email marketing</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">✗</span>
                    </div>
                    <span>Weekly strategy calls</span>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <CtaButton 
                    text="Book Free Discovery Call" 
                    onClick={() => console.log('Offer CTA clicked')}
                    isSecondary={true}
                  />
                </div>
              </div>
            </div>
            
            {/* Package 3 */}
            <div className="bg-white/5 rounded-3xl p-1">
              <div className="glass h-full p-6 md:p-8 rounded-[22px] flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">Email Revenue</h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-bold">€1,997</span>
                    <span className="text-white/60 mb-1">/mo</span>
                  </div>
                  <p className="text-white/60 text-sm">+ 10% of revenue over baseline</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Full lifecycle email system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Segment setup and optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs text-mint-green">✓</span>
                    </div>
                    <span>Weekly email creative production</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">✗</span>
                    </div>
                    <span>Meta ads management</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs">✗</span>
                    </div>
                    <span>Store UX optimization</span>
                  </li>
                </ul>
                
                <div className="mt-auto">
                  <CtaButton 
                    text="Book Free Discovery Call" 
                    onClick={() => console.log('Offer CTA clicked')}
                    isSecondary={true}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <div className="bg-iris-purple/10 p-6 rounded-2xl border border-iris-purple/20">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Not sure which plan is right for you?</h3>
                  <p className="text-white/80">Our discovery call will help identify the exact growth levers for your store.</p>
                </div>
                
                <CtaButton 
                  text="Book Free Strategy Call" 
                  onClick={() => console.log('Offer CTA clicked')}
                  isSecondary={false}
                />
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