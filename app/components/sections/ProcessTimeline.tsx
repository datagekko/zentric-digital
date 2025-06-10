'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%', 
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      } 
    }
  };

  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "Fit check & content inventory (30 min).",
      duration: "Day 1"
    },
    {
      number: "02",
      title: "Planning & Strategy Sprint",
      description: "Internal build → one feedback call.",
      duration: "Days 2-3"
    },
    {
      number: "03",
      title: "Proposal",
      description: "Pricing tier, bonuses, guarantees; same-day e-sign.",
      duration: "Day 4"
    },
    {
      number: "04",
      title: "Kick-Off",
      description: "Access, pixels, creative brief locked.",
      duration: "Day 0"
    },
    {
      number: "05",
      title: "Creative Blast",
      description: "First testing ad set (5 ads) live.",
      duration: "Day 2"
    },
    {
      number: "06",
      title: "Weekly Momentum Call",
      description: "Metrics review, next CRO lever, blockers.",
      duration: "Weekly"
    },
    {
      number: "07",
      title: "Quarterly Zentric Review",
      description: "Revenue deep-dive, tier re-assessment, 90-day roadmap.",
      duration: "Every 90 Days"
    }
  ];

  return (
    <section className="py-20 bg-deep-navy/95 relative overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-iris-purple/10 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-mint-green/5 blur-3xl"></div>
      </div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white bg-gradient-to-r from-white to-mint-green/70 bg-clip-text text-transparent">
              Our Onboarding Process
            </h2>
            <p className="text-nordic-ivory/80 text-lg">
              We're built for speed and results. Here's how we transform your growth engine from day one.
            </p>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Vertical line with animation */}
            <motion.div 
              variants={lineVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="absolute top-0 left-0 md:left-1/2 h-full w-1 bg-gradient-to-b from-iris-purple via-iris-purple-light to-mint-green/70 z-0 transform md:-translate-x-1/2"
            ></motion.div>
            
            <div className="space-y-24 relative z-10">
              {steps.map((step, index) => {
                // Calculate animation delay based on index
                const delay = index * 0.15;
                
                return (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Left side (even) or right side (odd) */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right order-1' : 'md:pl-16 md:order-3'}`}>
                      <div className="bg-deep-navy/50 backdrop-blur-sm p-8 rounded-xl border border-iris-purple/20 shadow-lg hover:shadow-iris-purple/10 transition-all duration-300 hover:-translate-y-1">
                        <div className="kpi-text bg-gradient-to-r from-iris-purple to-iris-purple-light bg-clip-text text-transparent mb-2">{step.number}</div>
                        <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                        <p className="text-nordic-ivory/70 mb-4">{step.description}</p>
                        <div className="text-sm font-medium text-mint-green/80">{step.duration}</div>
                      </div>
                    </div>
                    
                    {/* Center circle with pulse animation */}
                    <div className="md:order-2 absolute md:absolute left-0 top-6 md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-iris-purple to-iris-purple-light flex items-center justify-center text-white font-bold z-10 shadow-lg shadow-iris-purple/30"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {index + 1}
                        <div className="absolute w-full h-full rounded-full bg-iris-purple/30 animate-ping opacity-75"></div>
                      </motion.div>
                    </div>
                    
                    {/* Empty space for alternating layout */}
                    <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}></div>
                  </div>
                </motion.div>
              )})}
            </div>
          </div>

          {/* Results after implementation */}
          <motion.div 
            variants={fadeUp} 
            className="bg-gradient-to-r from-deep-navy to-iris-purple p-[1px] rounded-2xl overflow-hidden"
          >
            <div className="bg-deep-navy/80 backdrop-blur-lg p-8 rounded-xl">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-6 text-white">Guaranteed Results</h3>
                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-nordic-ivory/90">Creative Blast SLA: Testing ad set (5 ads) live within 48h</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-nordic-ivory/90">3× ROAS Pledge: Minimum blended ROAS in 90 days</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-nordic-ivory/90">No-Lock-In Exit: Leave with 15-day notice after initial 90 days</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-nordic-ivory/90">Zero-Spend Mark-Up: We never skim ad budget</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3 bg-deep-navy/60 border border-iris-purple/20 rounded-xl p-8 text-center shadow-lg transform hover:scale-105 transition-all duration-300">
                  <div className="text-xs text-nordic-ivory/60 uppercase tracking-wider mb-2">GUARANTEED OUTCOME</div>
                  <div className="text-6xl font-bold bg-gradient-to-r from-mint-green to-iris-purple-light bg-clip-text text-transparent mb-2">3×</div>
                  <div className="text-nordic-ivory/80">Minimum ROAS in 90 Days</div>
                </div>
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