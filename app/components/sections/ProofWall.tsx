'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProofWall = () => {
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

  // Sample testimonials - would be replaced with actual client testimonials
  const testimonials = [
    {
      quote: "Within 4 weeks of working with Zentric, our CPA dropped by 28% while ROAS increased from 1.7x to 4.3x.",
      author: "Sara L.",
      company: "Founder, NordicVibes.co",
      image: "/images/testimonial-1.jpg"
    },
    {
      quote: "Their approach to lifecycle emails transformed our business. We saw a 42% increase in repeat purchases in the first quarter.",
      author: "Marc T.",
      company: "Marketing Director, PureEssentials",
      image: "/images/testimonial-2.jpg"
    },
    {
      quote: "The most transparent agency we've worked with. No fluff, just results. Our CAC is down 31% and AOV up 24%.",
      author: "Ellie K.",
      company: "CEO, Minimalista",
      image: "/images/testimonial-3.jpg"
    }
  ];

  const metrics = [
    { value: "+42%", label: "Average ROAS improvement" },
    { value: "-28%", label: "CPA reduction" },
    { value: "4.2x", label: "Email revenue boost" }
  ];

  return (
    <section className="py-20 bg-nordic-ivory relative">
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Results, Not Promises
            </h2>
            <p className="text-deep-navy/80 text-lg">
              We let our clients' outcomes speak for us. Here's what happens when you replace agency theater with data-driven execution.
            </p>
          </motion.div>

          {/* Metrics highlights */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-sm border border-deep-navy/5 text-center">
                <div className="text-iris-purple text-4xl md:text-5xl font-bold mb-2">
                  {metric.value}
                </div>
                <p className="text-deep-navy/70">{metric.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass p-6 rounded-2xl bg-deep-navy text-white flex flex-col"
              >
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-iris-purple/50">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-white/90 mb-6 flex-1">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 mr-3"></div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-white/60 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Case study snapshot */}
          <motion.div variants={fadeUp} className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-deep-navy/5">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-xs text-deep-navy/60 uppercase tracking-wider mb-2">CASE STUDY</div>
                <h3 className="text-2xl font-bold mb-4">How we helped PureEssentials achieve 4.7x ROAS in 30 days</h3>
                <p className="text-deep-navy/70 mb-6">
                  PureEssentials was struggling with rising CPAs and stagnant conversion rates. We implemented our 3-part growth system and saw immediate results.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <div className="text-iris-purple font-bold text-2xl">+173%</div>
                    <div className="text-deep-navy/70 text-sm">Conversion rate</div>
                  </div>
                  <div>
                    <div className="text-iris-purple font-bold text-2xl">-42%</div>
                    <div className="text-deep-navy/70 text-sm">Customer acquisition cost</div>
                  </div>
                  <div>
                    <div className="text-iris-purple font-bold text-2xl">4.7x</div>
                    <div className="text-deep-navy/70 text-sm">ROAS (from 1.8x)</div>
                  </div>
                  <div>
                    <div className="text-iris-purple font-bold text-2xl">+€37K</div>
                    <div className="text-deep-navy/70 text-sm">Additional monthly profit</div>
                  </div>
                </div>
                <button className="btn-tertiary text-iris-purple">
                  Read full case study →
                </button>
              </div>
              <div className="md:w-1/2 lg:w-2/5 bg-deep-navy/5 rounded-xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofWall;

// reasoning: This section uses concrete metrics and specific testimonials to establish
// credibility and create desire. The metrics are displayed prominently, and the case study
// provides a detailed example of the results Zentric has achieved. This reduces perceived
// risk and makes the value proposition more tangible. 