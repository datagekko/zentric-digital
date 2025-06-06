'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProcessTimeline = () => {
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

  const steps = [
    {
      number: "01",
      title: "Strategy Audit",
      description: "We conduct a deep audit of your funnel, metrics, and market position. You'll get a growth roadmap regardless of whether you decide to work with us.",
      duration: "Week 1"
    },
    {
      number: "02",
      title: "Implementation Sprint",
      description: "Our team executes the first round of high-impact changes to your ads, store UX, and email workflows.",
      duration: "Week 2"
    },
    {
      number: "03",
      title: "Test & Optimize",
      description: "Rigorous split testing and data analysis to refine the strategy based on real customer behavior.",
      duration: "Week 3-4"
    },
    {
      number: "04",
      title: "Scale Systematically",
      description: "With proven winners identified, we scale budget and expand your customer acquisition channels.",
      duration: "Ongoing"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our 4-Week Process
            </h2>
            <p className="text-deep-navy/80 text-lg">
              Most agencies take months to show results. We're built for speed. Here's how we transform your funnel in 30 days.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={fadeUp} className="relative">
            {/* Horizontal line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-deep-navy/10 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  {/* Circle on timeline */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-iris-purple to-iris-purple-light flex items-center justify-center text-white font-bold mb-4 md:mb-8 z-10">
                    {index + 1}
                  </div>
                  
                  {/* Content card */}
                  <div className="w-full bg-nordic-ivory p-6 rounded-xl shadow-sm">
                    <div className="kpi-text text-iris-purple mb-2">{step.number}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-deep-navy/70 mb-4">{step.description}</p>
                    <div className="text-sm font-medium text-deep-navy/50">{step.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results after 30 days */}
          <motion.div variants={fadeUp} className="bg-gradient-to-r from-deep-navy to-iris-purple p-1 rounded-2xl">
            <div className="bg-white p-8 rounded-xl">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Results After 30 Days</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-deep-navy/80">Clear attribution of marketing spend impact</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-deep-navy/80">Improved conversion rate (+25-40% typical)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-deep-navy/80">Reduced customer acquisition costs (-20-35% typical)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-mint-green/20 flex items-center justify-center mt-0.5">
                        <span className="text-xs text-mint-green">✓</span>
                      </div>
                      <span className="text-deep-navy/80">Automated email flows generating 15-25% of revenue</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3 bg-nordic-ivory rounded-xl p-6 text-center">
                  <div className="text-xs text-deep-navy/60 uppercase tracking-wider mb-2">AVERAGE OUTCOME</div>
                  <div className="text-5xl font-bold text-iris-purple mb-2">3.8x</div>
                  <div className="text-deep-navy/70">ROAS Improvement</div>
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