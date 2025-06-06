'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PasSlab = () => {
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

  const problems = [
    {
      title: "Eroding ROAS",
      description: "Ad costs climbing while conversion rates flatline—it's not the platform, it's your funnel.",
    },
    {
      title: "One-Shot Buyers",
      description: "85% of customers buy once and vanish. Your data shows why, but agencies ignore it.",
    },
    {
      title: "Acquisition Addiction",
      description: "Burning cash acquiring customers while ignoring the ones you already converted.",
    }
  ];

  return (
    <section className="py-20 bg-nordic-ivory relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 z-0"></div>
      
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          {/* Problem Section */}
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center">
              Ecommerce brands face 3 universal challenges...
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-deep-navy/5 flex flex-col"
                >
                  <div className="kpi-text text-iris-purple mb-2">0{index + 1}</div>
                  <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                  <p className="text-deep-navy/70">{problem.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Agitation Section */}
          <motion.div variants={fadeUp} className="bg-deep-navy text-white p-8 md:p-12 rounded-3xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Meanwhile, traditional agencies are...
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-iris-purple/20 flex items-center justify-center mt-1">
                    <span className="text-sm text-mint-green">✗</span>
                  </div>
                  <p className="text-white/90">Charging retainers regardless of results</p>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-iris-purple/20 flex items-center justify-center mt-1">
                    <span className="text-sm text-mint-green">✗</span>
                  </div>
                  <p className="text-white/90">Using vanity metrics to hide declining performance</p>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-iris-purple/20 flex items-center justify-center mt-1">
                    <span className="text-sm text-mint-green">✗</span>
                  </div>
                  <p className="text-white/90">Taking 30+ days to implement simple campaign tweaks</p>
                </div>
                
                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white/50 text-sm uppercase">Industry Average</span>
                      <div className="text-2xl font-bold text-white">1.8x ROAS</div>
                    </div>
                    <div className="h-10 w-px bg-white/10"></div>
                    <div>
                      <span className="text-mint-green text-sm uppercase">Zentric Clients</span>
                      <div className="text-2xl font-bold text-mint-green">4.2x ROAS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution Section */}
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              The Zentric Difference
            </h3>
            
            <p className="text-lg md:text-xl text-deep-navy/80 mb-8">
              We approach ecommerce growth as a data engineering problem, not a creative guessing game. Our system integrates CRO, Meta Ads, and Lifecycle Email through one cohesive strategy—converting your traffic into scalable profit.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-5 bg-nordic-ivory border border-mint-green/20 rounded-xl">
                <div className="text-mint-green font-semibold">CRO</div>
                <p className="text-sm text-deep-navy/70">Data-driven UI/UX optimizations that lift conversion rates by avg. 37%</p>
              </div>
              
              <div className="p-5 bg-nordic-ivory border border-iris-purple/20 rounded-xl">
                <div className="text-iris-purple font-semibold">Meta Ads</div>
                <p className="text-sm text-deep-navy/70">Rapid testing with AI-driven creative and audience analysis</p>
              </div>
              
              <div className="p-5 bg-nordic-ivory border border-deep-navy/20 rounded-xl">
                <div className="text-deep-navy font-semibold">Lifecycle Email</div>
                <p className="text-sm text-deep-navy/70">Behavior-triggered campaigns that convert 1-time buyers into loyal customers</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PasSlab;

// reasoning: This section follows the Problem-Agitation-Solution copywriting framework.
// It establishes clear pain points, agitates them by contrasting with typical agency behavior,
// then presents Zentric's solution. The contrast box with specific metrics (1.8x vs 4.2x ROAS)
// provides quantifiable proof, building credibility and desire. 