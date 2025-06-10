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
    "Predictable net-new revenue (minimum 3× blended ROAS in 90 days)",
    "Meta & TikTok paid media campaigns with zero setup fee",
    "On-site copy, layout and offer-sequencing optimization",
    "Senior operators run growth end-to-end — no account manager hand-offs",
    "AI-powered creative pipeline for rapid ad variants",
    "Weekly performance reviews and optimization"
  ];

  const doneWithYouItems = [
    "4-hour response SLA on WhatsApp Business / Microsoft Teams",
    "Quarterly Zentric Review of performance, CRO roadmap and creative themes",
    "First-party dashboard with real-time spend, revenue, ROAS metrics",
    "Performance guarantees with creative SLA and 3× ROAS pledge",
    "No lock-in exit after 90 days with full creative and data ownership"
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How We Operate
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Precision-Driven Growth Engine: Paid Acquisition + Conversion-Rate Optimisation for Lifestyle Brands
            </p>
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
                Progressive Revenue-Share Model
              </h3>
              <p className="text-white/80 text-lg mb-8">
                We only win when you win. Our pricing scales with your success, with progressive tiers based on revenue performance.
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