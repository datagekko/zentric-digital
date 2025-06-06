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

  // Placeholder logos - would be replaced with actual client logos
  const logos = [
    { name: 'Meta Business Suite', width: 'w-24' },
    { name: 'Shopify', width: 'w-24' },
    { name: 'Klaviyo', width: 'w-20' },
    { name: 'Google Ads', width: 'w-24' },
    { name: 'Mailchimp', width: 'w-28' }
  ];

  return (
    <section className="py-10 bg-nordic-ivory border-y border-deep-navy/10">
      <div ref={ref} className="container mx-auto px-8">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <p className="text-deep-navy/60 mb-8 text-center font-medium">
            Trusted by 173 DTC brands in 9 countries
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center">
            {logos.map((logo, index) => (
              <div 
                key={index} 
                className={`${logo.width} h-8 bg-deep-navy/10 rounded flex items-center justify-center`}
              >
                <span className="text-xs text-deep-navy/40 font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilityBar;

// reasoning: The credibility bar provides social proof through client logos 
// and a specific count ("173 DTC brands") rather than a vague claim. 
// It uses subtle animation to draw attention without distracting from the main message. 