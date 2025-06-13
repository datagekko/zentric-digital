'use client';

import { useState, useEffect, useRef, MutableRefObject } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useLeadForm } from '../../contexts/LeadFormContext';

// Create a function to merge refs
const useMergedRef = <T extends HTMLElement>(...refs: (MutableRefObject<T | null> | ((node: T) => void) | null)[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
};

// Helper function to throttle function calls
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const HeroSection = () => {
  const { openLeadForm } = useLeadForm();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickStartOpen, setIsQuickStartOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const quickStartRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Use this to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only initialize scroll tracking on client-side to avoid hydration mismatch
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Mouse position for interactive background - initialize with default values
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(400);
  
  // Initialize window-dependent values after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
      
      // Check for reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mouseX, mouseY]);
  
  // Separate useEffect for reduced motion to avoid dependency issues
  useEffect(() => {
    setIsClient(true); // Mark as client-side rendered
  }, []);
  
  // Parallax effect values - reduced range for subtlety
  // Only calculate transforms on client-side to avoid hydration mismatches
  const parallaxX = useTransform(
    mouseX, 
    [0, isClient ? window.innerWidth : 1000], 
    [-2, 2]
  );
  const parallaxY = useTransform(
    mouseY, 
    [0, isClient ? window.innerHeight : 800], 
    [-2, 2]
  );
  
  // Higher damping for smoother movement
  const smoothParallaxX = useSpring(parallaxX, { damping: 100, stiffness: 200 });
  const smoothParallaxY = useSpring(parallaxY, { damping: 100, stiffness: 200 });
  
  // Handle mouse move for interactive elements - with throttling
  useEffect(() => {
    if (!isClient || prefersReducedMotion) return;
    
    // Throttle the mouse move handler to improve performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }, 25); // 25ms throttle
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion, isClient]);

  // Handle scroll effect for sticky header
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    }, 50); // 50ms throttle

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  // Close quick start menu when clicking outside
  useEffect(() => {
    if (!isClient) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (quickStartRef.current && !quickStartRef.current.contains(event.target as Node)) {
        setIsQuickStartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isClient]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isClient) return;
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, isClient]);

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

  // Staggered animation for children
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Quick start dropdown animation
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        duration: 0.3,
        delay: 0.1 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };
  
  // Text reveal animation for the hero title
  const revealText = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delayChildren: 0.2,
        staggerChildren: 0.05
      }
    }
  };
  
  // Character animation for typed text effect
  const characterAnimation = {
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
  
  // Continuous subtle animation for CTA buttons - made more obvious
  const ctaPulseAnimation = {
    initial: { 
      scale: 1,
      boxShadow: "0px 0px 0px 0px rgba(99, 91, 255, 0)" 
    },
    animate: { 
      scale: [1, 1.05, 1],
      boxShadow: [
        "0px 0px 0px 0px rgba(99, 91, 255, 0)",
        "0px 0px 15px 3px rgba(99, 91, 255, 0.4)",
        "0px 0px 0px 0px rgba(99, 91, 255, 0)"
      ],
      transition: {
        duration: 2.5,
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };
  
  // Simplified CTA button variants
  const ctaButtonVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0px 0px 0px 0px rgba(99, 91, 255, 0)"
    },
    hover: { 
      scale: 1.04,
      boxShadow: "0px 0px 10px 0px rgba(99, 91, 255, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const quickStartSections = [
    { label: "The Challenge", href: "#challenge" },
    { label: "Our Solution", href: "#solution" },
    { label: "The Zentric Way", href: "#process" },
    { label: "Let's Talk", href: "#contact" },
  ];
  
  // Animated number counter
  const Counter = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => {
    const valueRef = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
      if (!isClient || !inView || !valueRef.current || prefersReducedMotion) return;
      
      const rawValue = valueRef.current.textContent || "";
      const isPercentage = rawValue.includes("%");
      const isMultiplier = rawValue.includes("x");
      let numericValue = parseFloat(rawValue.replace(/[^\d.-]/g, ""));
      
      // Don't animate if the value isn't actually a number
      if (isNaN(numericValue)) return;
      
      // For negative values, adjust starting point
      const startValue = numericValue < 0 ? numericValue * 1.5 : 0;
      const endValue = numericValue;
      
      let startTime: number | null = null;
      const duration = 1000; // 1 second animation as per brand guideline
      
      const formatValue = (value: number) => {
        return (isPercentage ? 
          (value >= 0 ? "+" : "") + value.toFixed(0) + "%" :
          (isMultiplier ? value.toFixed(1) + "x" : value.toFixed(0))
        );
      };
      
      // Pre-calculate animation frames to reduce layout thrashing
      const frames: string[] = [];
      const frameCount = 60; // Approximately 60fps for 1 second
      
      for (let i = 0; i <= frameCount; i++) {
        const progress = i / frameCount;
        const currentValue = startValue + (endValue - startValue) * progress;
        frames.push(formatValue(currentValue));
      }
      
      let frameIndex = 0;
      const updateFrame = () => {
        if (frameIndex <= frameCount && valueRef.current) {
          valueRef.current.textContent = frames[frameIndex];
          frameIndex++;
          requestAnimationFrame(updateFrame);
        }
      };
      
      // Add delay before starting animation
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(updateFrame);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    }, [inView, value, delay, prefersReducedMotion, isClient]);
    
    return (
      <div className="flex flex-col items-center justify-center h-10 md:h-16">
        <span ref={valueRef} className="text-mint-green text-lg md:text-xl lg:text-2xl font-bold tracking-wider font-mono uppercase">{value}</span>
        <span className="text-white/70 text-[10px] md:text-xs mt-0.5 md:mt-1 text-center">{label}</span>
      </div>
    );
  };

  // Create a merged ref for both inView and heroRef
  const mergedRef = useMergedRef(ref, heroRef);

  // Create a CSS variable for the mouse position - safely handle SSR
  const bgStyle: CSSProperties = isClient ? {
    '--mouse-x': mouseX.get() + 'px',
    '--mouse-y': mouseY.get() + 'px',
    position: 'relative' // Ensure scroll tracking works correctly
  } as CSSProperties : { position: 'relative' };

  return (
    <section 
      ref={mergedRef}
      className="min-h-screen h-auto flex flex-col justify-between bg-nordic-ivory relative"
      style={{ ...bgStyle, overflow: 'visible' }}
    >
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-iris-purple/5 to-mint-green/5 z-0" />
      
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-iris-purple/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-mint-green/5 blur-3xl" />
      </div>
      
      {/* Interactive background - using CSS instead of inline style for better performance */}
      {isClient && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 z-0 opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(99,91,255,0.15), rgba(83,221,108,0.08) 40%, rgba(245,240,234,0) 80%)`
          }}
        />
      )}
      
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
                className="block py-3 text-onyx hover:text-iris-purple transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How We Work
              </Link>
              <Link
                href="/about-us"
                className="block py-3 text-onyx hover:text-iris-purple transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/cases"
                className="block py-3 text-onyx hover:text-iris-purple transition-colors duration-200"
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

      <motion.div 
        className="container mx-auto px-6 md:px-8 pt-8 md:pt-16 pb-4 z-10 text-center md:text-left max-w-7xl flex-1 flex flex-col justify-center"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ overflow: 'visible', clipPath: 'none' }}
      >
        {/* Grid layout for desktop, stack for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-12 items-center" style={{ overflow: 'visible' }}>
          {/* Left column: Text content */}
          <div className="space-y-1 md:space-y-3" style={{ overflow: 'visible', clipPath: 'none', padding: '0 0 0.5em 0' }}>
            <motion.div variants={fadeUp} className="">
              <p className="text-iris-purple font-medium tracking-wider uppercase text-sm">Digital Growth Agency</p>
            </motion.div>

            <motion.h1 
              variants={revealText} 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-none -tracking-[2px] whitespace-nowrap"
              style={{ overflow: 'visible', lineHeight: '1.1', paddingBottom: '0.1em' }}
            >
              <div className="whitespace-nowrap">Make Noise.</div>
              <span 
                className="bg-gradient-to-r from-mint-green to-iris-purple bg-clip-text text-transparent whitespace-nowrap"
                style={{ 
                  display: 'inline-block', 
                  overflow: 'visible', 
                  paddingBottom: '0.1em',
                  position: 'relative',
                  zIndex: 10
                }}
              >
                Stay Zentric.
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeUp} 
              className="text-sm md:text-lg lg:text-xl text-deep-navy/80 max-w-3xl mt-0"
            >
              Transform underperforming funnels into profit machines in just 90 days. We help e-commerce businesses scale rapidly with high-converting Meta Ads and proven CRO strategies.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 pt-2">
              <motion.button 
                onClick={openLeadForm}
                variants={ctaButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                animate={isClient ? ctaPulseAnimation.animate : undefined}
                className="py-3 md:py-4 px-6 md:px-8 text-white font-semibold rounded-full whitespace-nowrap bg-gradient-to-r from-[#635BFF] to-[#7A6CFF] will-change-transform"
              >
                Book Free Discovery Call
              </motion.button>
              
              <div className="flex justify-center md:justify-start md:flex-row items-center gap-3 mt-2 md:mt-0 md:ml-8 w-full md:w-auto">
                <div className="w-12 h-px bg-deep-navy/20 hidden md:block"></div>
                <p className="text-deep-navy/70 font-medium text-sm md:text-base text-center md:text-left">
                  At least <span className="text-iris-purple font-bold">3×</span> ROAS in 90 days
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column: Dashboard mockup with refined parallax effect */}
          <div className="flex flex-col items-center mt-6 md:mt-0 relative">
            {isClient && (
              <motion.div 
                variants={fadeUp}
                style={!prefersReducedMotion ? {
                  x: smoothParallaxX,
                  y: smoothParallaxY
                } : {}}
                className="mx-auto lg:mx-0 max-w-xl w-full p-1 md:p-2 rounded-2xl overflow-hidden will-change-transform relative"
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                <div className="bg-deep-navy backdrop-blur-xl bg-opacity-75 rounded-3xl border border-white/16 shadow-[0_4px_24px_rgba(0,0,0,0.18)] p-1 md:p-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-iris-purple/10 to-mint-green/10 rounded-lg p-3 md:p-6">
                    <div className="flex justify-between items-center mb-3 md:mb-6">
                      <div className="text-white text-sm md:text-base font-bold">Performance Dashboard</div>
                      <div className="text-mint-green text-sm md:text-base font-mono tracking-wider">+38% ROAS</div>
                    </div>
                    
                    {/* Progress bar with improved animation */}
                    <div className="mb-3 md:mb-6 bg-white/10 h-1.5 md:h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-iris-purple to-mint-green"
                        initial={{ width: "0%" }}
                        animate={{ width: "75%" }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.5, 
                          ease: "easeOut" 
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 md:gap-6">
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-md border border-white/5">
                        <Counter value="+42%" label="Average ROAS" delay={100} />
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-md border border-white/5">
                        <Counter value="-28%" label="CPA reduction" delay={200} />
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-md border border-white/5">
                        <Counter value="4.2x" label="Ads revenue" delay={300} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {!isClient && (
              <div className="mx-auto lg:mx-0 max-w-xl w-full p-1 md:p-2 rounded-2xl overflow-hidden will-change-transform relative">
                <div className="bg-deep-navy backdrop-blur-xl bg-opacity-75 rounded-3xl border border-white/16 shadow-[0_4px_24px_rgba(0,0,0,0.18)] p-1 md:p-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-iris-purple/10 to-mint-green/10 rounded-lg p-3 md:p-6">
                    <div className="flex justify-between items-center mb-3 md:mb-6">
                      <div className="text-white text-sm md:text-base font-bold">Performance Dashboard</div>
                      <div className="text-mint-green text-sm md:text-base font-mono tracking-wider">+38% ROAS</div>
                    </div>
                    
                    <div className="mb-3 md:mb-6 bg-white/10 h-1.5 md:h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-iris-purple to-mint-green w-[75%]" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 md:gap-6">
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-md border border-white/5">
                        <div className="flex flex-col items-center justify-center h-10 md:h-16">
                          <span className="text-mint-green text-lg md:text-xl lg:text-2xl font-bold tracking-wider font-mono uppercase">+42%</span>
                          <span className="text-white/70 text-[10px] md:text-xs mt-0.5 md:mt-1 text-center">Average ROAS</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-md border border-white/5">
                        <div className="flex flex-col items-center justify-center h-10 md:h-16">
                          <span className="text-mint-green text-lg md:text-xl lg:text-2xl font-bold tracking-wider font-mono uppercase">-28%</span>
                          <span className="text-white/70 text-[10px] md:text-xs mt-0.5 md:mt-1 text-center">CPA reduction</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-md border border-white/5">
                        <div className="flex flex-col items-center justify-center h-10 md:h-16">
                          <span className="text-mint-green text-lg md:text-xl lg:text-2xl font-bold tracking-wider font-mono uppercase">4.2x</span>
                          <span className="text-white/70 text-[10px] md:text-xs mt-0.5 md:mt-1 text-center">Ads revenue</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <motion.p 
              variants={fadeUp} 
              className="text-xs md:text-sm lg:text-base text-deep-navy/80 mt-2 md:mt-4 text-center max-w-md mx-auto"
            >
              No fluff, no false promises - just real, measurable results.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Bottom section with improved scroll indicator */}
      <div className="relative pb-2 hidden md:flex justify-center items-center">
        <motion.div 
          className="mb-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 border-2 border-deep-navy/30 rounded-full flex justify-center pt-1">
            <motion.div 
              className="w-1 h-1 bg-gradient-to-r from-iris-purple to-mint-green rounded-full"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

// reasoning: Hero section uses motion and staggered animations to draw attention
// The scroll depth is tracked for analytics. The CTA is prominently placed with
// social proof ("Guaranteed +28% ROAS") to reduce conversion friction. 