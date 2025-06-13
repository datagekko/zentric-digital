'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { Button } from '../ui/button';

const Footer = () => {
  const { openLeadForm } = useLeadForm();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <footer className="py-16">
      <div ref={ref} className="container mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={item}
        >
          <Link href="/">
            <Image
              src="/images/logo-grey.png"
              alt="Zentric Digital Logo"
              width={60}
              height={60}
              className="mx-auto mb-6"
            />
          </Link>
          
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto text-foreground">
            Ready to Make Some Noise?
          </h2>
          <p className="text-muted-foreground mt-4 mb-8 max-w-xl mx-auto">
            Stop leaving money on the table. Let's build a compounding profit engine for your brand. Your first strategy call is on us.
          </p>
          
          <Button variant="primary" size="lg" onClick={openLeadForm}>
            Book Your Free Strategy Call
          </Button>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Zentric Digital. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
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