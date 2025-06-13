'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

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

  const footerLinks = [
    { section: "Company", links: [
      { name: "About", url: "#" },
      { name: "Team", url: "#" },
      { name: "Careers", url: "#" },
      { name: "Press", url: "#" }
    ]},
    { section: "Services", links: [
      { name: "CRO", url: "#" },
      { name: "Meta Ads", url: "#" },
      { name: "Email Marketing", url: "#" },
      { name: "Analytics", url: "#" }
    ]},
    { section: "Resources", links: [
      { name: "Blog", url: "#" },
      { name: "Case Studies", url: "#" },
      { name: "Guides", url: "#" },
      { name: "Webinars", url: "#" }
    ]},
    { section: "Legal", links: [
      { name: "Privacy", url: "#" },
      { name: "Terms", url: "#" },
      { name: "Cookies", url: "#" }
    ]}
  ];

  return (
    <footer className="bg-onyx text-white py-16 relative">
      <div ref={ref} className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="md:col-span-2">
              <Image
                src="/images/logo-grey.png"
                alt="Zentric Digital Logo"
                width={60}
                height={16}
                className="mb-4"
              />
              <p className="text-white/70 mb-6 max-w-xs">
                Transform under-performing funnels into compounding profit engines in 30 days — or you don't pay.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-iris-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-iris-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-iris-purple transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/50">
                  {section.section}
                </div>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url} className="text-white/80 hover:text-mint-green transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Zentric Digital. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-white/50 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-white/50 hover:text-white text-sm">Cookies</a>
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