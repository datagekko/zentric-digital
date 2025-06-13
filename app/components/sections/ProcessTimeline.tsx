'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const ProcessTimeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%', 
      transition: { duration: 2, ease: "easeInOut", delay: 0.5 } 
    }
  };

  const steps = [
    { number: "01", title: "Discovery Call", description: "Fit check & content inventory (30 min).", duration: "Day 1" },
    { number: "02", title: "Planning & Strategy", description: "Internal build, then one feedback call.", duration: "Days 2-3" },
    { number: "03", title: "Proposal", description: "Pricing, guarantees; same-day e-sign.", duration: "Day 4" },
    { number: "04", title: "Kick-Off", description: "Access, pixels, creative brief locked.", duration: "Day 0" },
    { number: "05", title: "Creative Blast", description: "First testing ad set (5 ads) live.", duration: "Day 2" },
    { number: "06", title: "Weekly Momentum", description: "Metrics review, next CRO lever, blockers.", duration: "Weekly" },
    { number: "07", title: "Quarterly Review", description: "Revenue deep-dive, tier re-assessment.", duration: "Quarterly" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
          className="space-y-16"
        >
          <motion.div variants={item} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold">
              Built for Speed & Results
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Our streamlined process transforms your growth engine from day one, delivering measurable results in record time.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              variants={lineVariants}
              className="absolute top-0 left-4 md:left-1/2 w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 z-0 transform -translate-x-1/2"
            />
            
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="relative flex items-start md:items-center flex-col md:flex-row"
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-1 md:text-left'} ml-12 md:ml-0`}>
                     <div className="glass-card p-6 inline-block">
                        <div className="font-mono text-primary mb-2">{step.duration}</div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                  </div>
                  
                  <div className="absolute left-4 top-5 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 w-9 h-9 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground font-bold z-10 flex-shrink-0">
                    {step.number}
                  </div>
                  
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            variants={item} 
            className="glass-card p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Guaranteed Results</h3>
                <ul className="space-y-4">
                  {[
                    "Creative Blast SLA: Testing ad set (5 ads) live within 48h",
                    "3× ROAS Pledge: Minimum blended ROAS in 90 days",
                    "No-Lock-In Exit: Leave with 15-day notice after initial 90 days",
                    "Zero-Spend Mark-Up: We never skim your ad budget"
                  ].map((guarantee, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 flex-shrink-0 bg-primary/20 rounded-full flex items-center justify-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-muted-foreground">{guarantee}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/3 text-center bg-black/20 rounded-2xl p-8 transform transition-all duration-300 hover:scale-105">
                <div className="text-sm text-primary uppercase tracking-wider mb-2 font-semibold">GUARANTEED OUTCOME</div>
                <div className="text-6xl font-bold text-foreground mb-2">3x</div>
                <div className="text-muted-foreground">Minimum ROAS in 90 Days</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

// reasoning: This section uses a timeline to visually demonstrate the process,
// which reduces perceived complexity and effort for the client. By breaking down
// the journey into four clear steps with specific timeframes, it makes the path
// to results feel more concrete and attainable. The "Results After 30 Days" box
// reinforces the speed and efficacy of the process. 