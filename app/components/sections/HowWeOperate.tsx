'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowWeOperate = () => {
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

  const doneForYouItems = [
    "We create the strategy",
    "We create the campaigns",
    "We collect data & optimise",
    "We scale to unseen heights",
    "We deliver a breathtaking ROI",
    "We take care of everything. A-Z"
  ];

  const doneWithYouItems = [
    "For businesses that need consulting.",
    "In conjunction with your team, Lasse will construct a premium advertising campaign, and instruct you on how to scale and maintain it in the future.",
    "Gives your team great insight into the mechanics of profitable social media advertising, from someone who does it successfully on a daily basis."
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
          <motion.div variants={fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16">
              How We Operate
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Done For You Column */}
            <motion.div 
              variants={fadeUp}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Done For You
              </h3>
              <div className="space-y-4">
                {doneForYouItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-mint-green">✓</span>
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Done With You Column */}
            <motion.div 
              variants={fadeUp}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Done With You
              </h3>
              <div className="space-y-6">
                {doneWithYouItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-mint-green">✓</span>
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-16">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">
                Build A Bullet Proof Sales Channel
              </h3>
              <p className="text-white/80 text-lg mb-8">
                Take the guess work out of sales. Our team will help you create consistent sales 
                for your brand, so you can focus on other things.
              </p>
              <div className="flex justify-center">
                <a 
                  href="#" 
                  className="inline-flex items-center px-8 py-3 bg-iris-purple hover:bg-iris-purple-light rounded-full text-white font-medium transition-all"
                >
                  Book A Free Consultation
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeOperate; 