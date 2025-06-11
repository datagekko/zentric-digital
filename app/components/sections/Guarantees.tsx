'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Guarantees = () => {
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
    <section className="py-12 bg-nordic-ivory text-onyx relative overflow-hidden" id="guarantees">
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">Our Guarantees</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Guarantee 1 */}
              <div className="bg-white shadow-sm rounded-xl p-4">
                <h4 className="font-bold text-iris-purple">Creative Blast SLA</h4>
                <p className="text-sm text-deep-navy/80 mt-1">Testing ad set live within 48 hours</p>
              </div>
              
              {/* Guarantee 2 */}
              <div className="bg-white shadow-sm rounded-xl p-4">
                <h4 className="font-bold text-iris-purple">3× ROAS Pledge</h4>
                <p className="text-sm text-deep-navy/80 mt-1">Or we work free until target is achieved</p>
              </div>
              
              {/* Guarantee 3 */}
              <div className="bg-white shadow-sm rounded-xl p-4">
                <h4 className="font-bold text-iris-purple">No-Lock-In Exit</h4>
                <p className="text-sm text-deep-navy/80 mt-1">Leave with 15-day notice after 90 days</p>
              </div>
              
              {/* Guarantee 4 */}
              <div className="bg-white shadow-sm rounded-xl p-4">
                <h4 className="font-bold text-iris-purple">Zero-Spend Mark-Up</h4>
                <p className="text-sm text-deep-navy/80 mt-1">We never skim ad budget, guaranteed</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantees; 