'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Guarantees = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const guarantees = [
      { title: "Creative Blast SLA", description: "Testing ad set live within 48 hours" },
      { title: "3× ROAS Pledge", description: "Or we work free until target is achieved" },
      { title: "No-Lock-In Exit", description: "Leave with 15-day notice after 90 days" },
      { title: "Zero-Spend Mark-Up", description: "We never skim ad budget, guaranteed" }
  ]

  return (
    <section className="py-20" id="guarantees">
      <div ref={ref} className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Ironclad Guarantees
            </h2>
            <p className="text-muted-foreground text-lg mt-2 max-w-2xl mx-auto">
              We believe in accountability and tangible results. That's why every partnership is backed by these promises.
            </p>
          </motion.div>
          <motion.div variants={item} className="glass-card">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
              {guarantees.map((guarantee, index) => (
                  <div key={index} className="p-6 text-center bg-card/80 hover:bg-card/90 transition-colors">
                    <h4 className="font-bold text-lg text-primary">{guarantee.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{guarantee.description}</p>
                  </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantees; 