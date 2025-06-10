'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CredibilityBar = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-10 bg-nordic-ivory border-y border-deep-navy/10">
      <div ref={ref} className="container mx-auto px-8">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Content placeholder for future credibility elements */}
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilityBar; 