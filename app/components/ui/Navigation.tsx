'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLeadForm } from '../../contexts/LeadFormContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickStartOpen, setIsQuickStartOpen] = useState(false);
  const quickStartRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { openLeadForm } = useLeadForm();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickStartRef.current && !quickStartRef.current.contains(event.target as Node)) {
        setIsQuickStartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const quickStartSections = [
    { label: 'The Challenge', href: '#challenge' },
    { label: 'Our Solution', href: '#solution' },
    { label: 'The Zentric Way', href: '#process' },
    { label: 'Let\'s Talk', href: '#contact' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.2 } },
  };

  const ctaButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(99, 91, 255, 0.2)' },
    tap: { scale: 0.95 }
  };

  return (
    <>
      {/* Sticky Header */}
      <header 
        className={`fixed top-0 left-0 w-full py-6 px-8 flex justify-between items-center z-50 transition-all duration-300 ${
          isScrolled 
            ? 'border-b border-onyx/10 shadow-sm' 
            : ''
        }`}
        style={{ backgroundColor: pathname === '/' ? '#e8e9e5' : '#edebe9' }}
      >
        <Link href="/" className="text-2xl font-bold">Zentric Digital</Link>
        
        {/* Navigation Links - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-10">
          {/* Quick Start Dropdown */}
          <div 
            ref={quickStartRef} 
            className="relative"
            onMouseEnter={() => setIsQuickStartOpen(true)}
            onMouseLeave={() => setIsQuickStartOpen(false)}
          >
            <button 
              className="flex items-center text-onyx hover:text-iris-purple transition-colors duration-200 font-medium text-base relative group"
            >
              <span>Quick Start</span>
              <motion.svg 
                className="ml-1 w-4 h-4"
                animate={{ rotate: isQuickStartOpen ? 180 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
              
              {/* Hover gradient underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-iris-purple to-mint-green group-hover:w-full transition-all duration-200 ease-out"></span>
            </button>
            
            <AnimatePresence>
              {isQuickStartOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-2 w-[280px] z-50"
                >
                  <div className="bg-deep-navy backdrop-blur-2xl bg-opacity-75 rounded-3xl border border-white/16 shadow-[0_4px_24px_rgba(0,0,0,0.18)] overflow-hidden">
                    <ul className="py-2">
                      {quickStartSections.map((section, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <a 
                            href={section.href}
                            onClick={() => setIsQuickStartOpen(false)}
                            className="flex px-5 py-3 text-nordic-ivory hover:bg-iris-purple/15 transition-all duration-120 ease-out group relative"
                          >
                            <span className="absolute left-0 top-0 bottom-0 w-0 bg-mint-green group-hover:w-[3px] transition-all duration-120"></span>
                            <span>{section.label}</span>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/how-we-work" 
            className={`text-onyx hover:text-iris-purple transition-colors duration-200 font-medium text-base relative group ${
              pathname === '/how-we-work' ? 'text-iris-purple' : ''
            }`}
          >
            How We Work
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-iris-purple to-mint-green transition-all duration-200 ease-out ${
              pathname === '/how-we-work' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
          <Link 
            href="/about-us" 
            className={`text-onyx hover:text-iris-purple transition-colors duration-200 font-medium text-base relative group ${
              pathname === '/about-us' ? 'text-iris-purple' : ''
            }`}
          >
            About Us
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-iris-purple to-mint-green transition-all duration-200 ease-out ${
              pathname === '/about-us' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
          <Link 
            href="/cases" 
            className={`text-onyx hover:text-iris-purple transition-colors duration-200 font-medium text-base relative group ${
              pathname === '/cases' ? 'text-iris-purple' : ''
            }`}
          >
            Cases
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-iris-purple to-mint-green transition-all duration-200 ease-out ${
              pathname === '/cases' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>
        </nav>
        
        {/* CTA Button with improved hover effect */}
        <div className="hidden md:block">
          <button 
            onClick={openLeadForm}
            className="py-3 px-8 text-white font-semibold rounded-full relative z-10 bg-gradient-to-r from-[#635BFF] to-[#7A6CFF]"
          >
            Book Free Discovery Call
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 flex flex-col items-end space-y-1.5">
            <span 
              className={`block h-0.5 bg-onyx transition-all duration-300 ${
                isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
              }`}
            ></span>
            <span 
              className={`block h-0.5 bg-onyx transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'w-4'
              }`}
            ></span>
            <span 
              className={`block h-0.5 bg-onyx transition-all duration-300 ${
                isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'
              }`}
            ></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden shadow-lg border-b border-onyx/10 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(245, 240, 234, 0.9)' }}
          >
            <div className="container mx-auto px-8 py-6 flex flex-col space-y-4">
              {/* Quick Start Dropdown in mobile menu */}
              <div className="border-b border-onyx/10 pb-4">
                <div className="font-medium mb-2 text-onyx">Quick Start</div>
                <ul className="pl-4 space-y-2">
                  {quickStartSections.map((section, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                    >
                      <a 
                        href={section.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-sm text-onyx/80 hover:text-iris-purple transition-colors duration-200"
                      >
                        {section.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <Link
                href="/how-we-work"
                className={`block py-3 ${
                  pathname === '/how-we-work' ? 'text-iris-purple' : 'text-onyx hover:text-iris-purple'
                } transition-colors duration-200`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How We Work
              </Link>
              <Link
                href="/about-us"
                className={`block py-3 ${
                  pathname === '/about-us' ? 'text-iris-purple' : 'text-onyx hover:text-iris-purple'
                } transition-colors duration-200`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/cases"
                className={`block py-3 ${
                  pathname === '/cases' ? 'text-iris-purple' : 'text-onyx hover:text-iris-purple'
                } transition-colors duration-200`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cases
              </Link>
              <div className="pt-2">
                <button 
                  onClick={() => {
                    openLeadForm();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-8 text-white font-semibold rounded-full bg-gradient-to-r from-[#635BFF] to-[#7A6CFF]"
                >
                  Book Free Discovery Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 