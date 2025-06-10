'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CtaButton from '../ui/CtaButton';

const HeroSection = () => {
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

  // Staggered animation for children
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section 
      ref={ref} 
      className="min-h-screen flex flex-col justify-between bg-nordic-ivory relative overflow-hidden"
    >
      {/* Background gradient element */}
      <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/5 to-mint-green/5 z-0" />
      
      <div className="absolute top-0 left-0 w-full py-6 px-8 flex justify-between items-center z-20">
        <div className="text-2xl font-bold">Zentric Digital</div>
        <CtaButton 
          text="Book Free Discovery Call" 
          className="hidden md:flex"
          onClick={() => console.log('CTA clicked in header')}
          isSecondary={true}
          compact={true}
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 md:px-8 pt-28 pb-10 z-10 text-center md:text-left max-w-7xl flex-1 flex flex-col justify-center"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Grid layout for desktop, stack for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column: Text content */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} className="">
              <p className="text-iris-purple font-medium tracking-wider uppercase text-sm">Digital Growth Agency</p>
            </motion.div>

            <motion.h1 
              variants={fadeUp} 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-hero font-extrabold leading-tight"
            >
              Make Noise.<br className="hidden md:block" /> 
              <span className="bg-gradient-to-r from-mint-green to-iris-purple bg-clip-text text-transparent">Stay Zentric.</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp} 
              className="text-xl md:text-2xl text-deep-navy/80 max-w-3xl"
            >
              Transform underperforming funnels into profit machines in just 30 days. No fluff, no false promises - just real, measurable results. We help e-commerce businesses scale rapidly with high-converting Meta Ads and proven CRO strategies.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 pt-4">
              <CtaButton 
                text="Book Free Discovery Call" 
                onClick={() => console.log('Primary CTA clicked')}
                isSecondary={false}
                className="whitespace-nowrap"
              />
              
              <div className="hidden md:flex items-center gap-3 ml-8">
                <div className="w-12 h-px bg-deep-navy/20"></div>
                <p className="text-deep-navy/70 font-medium">Guaranteed +28% ROAS in 30 days</p>
              </div>
            </motion.div>
          </div>

          {/* Right column: Dashboard mockup */}
          <motion.div 
            variants={fadeUp}
            className="mx-auto lg:mx-0 max-w-xl w-full glass p-2 rounded-2xl shadow-glass"
          >
            <div className="bg-deep-navy rounded-xl p-1 md:p-4 overflow-hidden">
              <div className="bg-gradient-to-r from-iris-purple/10 to-mint-green/10 rounded-lg p-4 md:p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-white font-bold">Performance Dashboard</div>
                  <div className="kpi-text text-mint-green">+38% ROAS</div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3">
                      <div className="h-12 md:h-16 bg-gradient-to-r from-iris-purple/20 to-deep-navy/5 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom section with scroll indicator */}
      <div className="relative pb-8 flex justify-center items-center">
        <motion.div 
          className="mb-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-deep-navy/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-iris-purple rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

// reasoning: Hero section uses motion and staggered animations to draw attention
// The scroll depth is tracked for analytics. The CTA is prominently placed with
// social proof ("Guaranteed +28% ROAS") to reduce conversion friction. 