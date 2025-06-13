'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { Button } from './button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/how-we-work', label: 'How We Work' },
    { href: '/about-us', label: 'About Us' },
    { href: '/cases', label: 'Cases' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/70 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
            <Image
              src="/images/logo-grey.png" // Using a light logo for the dark theme
              alt="Zentric Digital Logo"
              width={50}
              height={50}
              priority
              className="h-auto"
            />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors hover:text-foreground ${
                pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:block">
          <Button variant="primary" size="brand" onClick={openLeadForm}>
            Book a Call
          </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-around"
            >
                <motion.span 
                    className="block h-0.5 w-full bg-foreground rounded-full"
                    variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 5 }
                    }}
                ></motion.span>
                <motion.span 
                    className="block h-0.5 w-2/3 bg-foreground rounded-full"
                    variants={{
                        closed: { opacity: 1, x: 0 },
                        open: { opacity: 0, x: -10 }
                    }}
                ></motion.span>
                <motion.span 
                    className="block h-0.5 w-full bg-foreground rounded-full"
                    variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -5 }
                    }}
                ></motion.span>
            </motion.div>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden absolute top-full left-0 w-full mt-2"
          >
            <div className="container mx-auto px-6 py-4 bg-background/95 backdrop-blur-xl border-y border-white/5 rounded-2xl">
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map(link => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button 
                    variant="primary" 
                    className="w-full mt-4" 
                    onClick={() => { openLeadForm(); setIsMobileMenuOpen(false); }}
                >
                    Book a Call
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation; 