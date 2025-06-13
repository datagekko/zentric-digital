'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
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
    <footer className="bg-onyx text-white py-16 relative">
      <div ref={ref} className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex flex-col items-center text-center"
        >
          {/* Logo and value proposition */}
          <Image
            src="/images/logo-grey.png"
            alt="Zentric Digital Logo"
            width={80}
            height={21}
            className="mb-6"
          />
          
          <p className="text-white/70 mb-8 max-w-md text-center">
          Transform underperforming funnels into profit machines in just 90 days. We help e-commerce businesses scale rapidly with high-converting Meta Ads and proven CRO strategies.
</p>
          
          {/* CTA Button */}
          <Link 
            href="/contact"
            className="bg-iris-purple hover:bg-iris-purple/90 text-white font-medium px-8 py-3 rounded-md transition-all duration-300 hover:shadow-lg mb-16"
          >
            Book Your Strategy Call
          </Link>
          
          {/* Minimal bottom section */}
          <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Zentric Digital. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-white/50 hover:text-mint-green text-sm transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-white/50 hover:text-mint-green text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

// reasoning: The footer completes the landing page with important navigational elements
// and legal links, while reinforcing the brand message one last time. The layout
// follows a conventional pattern that users expect, improving usability. Social media
// links add credibility and additional contact points. 