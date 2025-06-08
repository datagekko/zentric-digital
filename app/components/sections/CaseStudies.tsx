'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedStudy, setExpandedStudy] = useState<number | null>(null);

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

  // Case studies data - would be fetched from CMS in production
  const caseStudies = [
    {
      id: 1,
      title: "PureEssentials: 4.7x ROAS in 30 Days",
      industry: "Skincare DTC",
      challenge: "PureEssentials was struggling with rising CPAs and diminishing returns on their ad spend. Their previous agency had focused on vanity metrics while true profitability declined.",
      solution: "We redesigned their acquisition funnel with our Velocity Stack, implementing pre-segmentation on landing pages, behavioral targeting, and AI-optimized email sequences.",
      results: [
        { label: "Conversion rate", value: "+173%" },
        { label: "Customer acquisition cost", value: "-42%" },
        { label: "ROAS", value: "4.7x" },
        { label: "Additional monthly profit", value: "+€37K" }
      ],
      timeline: "30 days",
      image: "/images/case-study-1.jpg"
    },
    {
      id: 2,
      title: "NordicVibes: Email Revenue Multiplied 4.2x",
      industry: "Home Goods",
      challenge: "NordicVibes had a large email list but minimal engagement. Despite regular newsletters, email contributed less than 5% of their total revenue.",
      solution: "We implemented our precision segmentation system, creating behavioral triggers and a dynamic content strategy that delivered personalized messaging based on purchase history and site behavior.",
      results: [
        { label: "Email open rate", value: "+112%" },
        { label: "Click-through rate", value: "+87%" },
        { label: "Email revenue", value: "4.2x" },
        { label: "List churn", value: "-38%" }
      ],
      timeline: "45 days",
      image: "/images/case-study-2.jpg"
    },
    {
      id: 3,
      title: "Minimalista: +62% AOV Through Funnel Optimization",
      industry: "Fashion",
      challenge: "Minimalista had good traffic and conversion rates but a below-industry-average order value, limiting their ability to scale profitably with increasing ad costs.",
      solution: "We rebuilt their product detail pages with dynamic upsell flows and implemented post-purchase upsell sequences that delivered personalized recommendations based on purchase behavior.",
      results: [
        { label: "Average order value", value: "+62%" },
        { label: "Cart abandonment", value: "-24%" },
        { label: "Customer lifetime value", value: "+41%" },
        { label: "Profit margin", value: "+18%" }
      ],
      timeline: "60 days",
      image: "/images/case-study-3.jpg"
    }
  ];

  const toggleExpanded = (id: number) => {
    if (expandedStudy === id) {
      setExpandedStudy(null);
    } else {
      setExpandedStudy(id);
    }
  };

  return (
    <section className="py-20 bg-onyx text-white relative">
      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Case Studies
            </h2>
            <p className="text-white/80 text-lg">
              Real businesses, real challenges, real results. See how our approach transforms underperforming funnels into profit engines.
            </p>
          </motion.div>

          {/* Case Studies Grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <motion.div 
                key={study.id} 
                className={`glass transition-all duration-300 ease-out overflow-hidden ${
                  expandedStudy === study.id ? 'lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-6' : ''
                }`}
                layout
              >
                {/* Card Header - Always visible */}
                <div className={`p-6 ${expandedStudy === study.id ? 'lg:col-span-1' : ''}`}>
                  <div className="text-xs text-white/60 uppercase tracking-wider mb-2">{study.industry}</div>
                  <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                  
                  {expandedStudy !== study.id && (
                    <>
                      <p className="text-white/80 mb-6 line-clamp-3">
                        {study.challenge}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {study.results.slice(0, 2).map((result, idx) => (
                          <div key={idx}>
                            <div className="text-mint-green font-bold text-xl">{result.value}</div>
                            <div className="text-white/60 text-sm">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <button 
                    onClick={() => toggleExpanded(study.id)}
                    className="btn-tertiary text-iris-purple hover:text-mint-green transition-colors"
                  >
                    {expandedStudy === study.id ? 'View Less' : 'View Case Study'} →
                  </button>
                </div>
                
                {/* Expanded Content */}
                {expandedStudy === study.id && (
                  <div className="lg:col-span-2 p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Challenge</h4>
                        <p className="text-white/80 mb-6">{study.challenge}</p>
                        
                        <h4 className="text-lg font-semibold mb-2">Solution</h4>
                        <p className="text-white/80 mb-6">{study.solution}</p>
                        
                        <div className="text-sm text-white/60">
                          <span className="text-mint-green font-bold">{study.timeline}</span> to implementation
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Results</h4>
                        <div className="grid grid-cols-2 gap-6">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="mb-4">
                              <div className="text-mint-green font-bold text-2xl">{result.value}</div>
                              <div className="text-white/60 text-sm">{result.label}</div>
                            </div>
                          ))}
                        </div>
                        
                        <button className="btn-secondary mt-6">
                          Get Similar Results
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeUp} className="text-center">
            <button className="btn-primary">
              Schedule Strategy Call
            </button>
            <p className="text-white/60 text-sm mt-4">
              No commitment, 30-minute assessment of your current funnel
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies; 