'use client';

import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const { openLeadForm } = useLeadForm();
  const [isClient, setIsClient] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const cardX = useSpring(useTransform(mouseX, [0, isClient ? window.innerWidth : 0], [-10, 10]), { stiffness: 200, damping: 50 });
  const cardY = useSpring(useTransform(mouseY, [0, isClient ? window.innerHeight : 0], [-10, 10]), { stiffness: 200, damping: 50 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const cardStyle: CSSProperties = isClient ? {
    transform: `rotateY(${cardX.get()}deg) rotateX(${-cardY.get()}deg)`,
    willChange: 'transform'
  } : {};
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-black/30 z-0" />
      
      {/* Animated blobs for ambient light */}
      <motion.div
        className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p variants={item} className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Digital Growth Agency
          </motion.p>
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent py-4">
            Make Noise. Stay Zentric.
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-lg md:text-xl max-w-4xl mx-auto text-muted-foreground">
            Transform underperforming funnels into profit machines in 90 days. We scale e-commerce brands with high-converting ads and proven CRO.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex justify-center gap-4">
            <Button variant="primary" size="lg" onClick={openLeadForm}>
                Book a Free Discovery Call
            </Button>
            <Button variant="secondaryBrand" size="lg" onClick={() => document.getElementById('challenge')?.scrollIntoView()}>
                Learn More
            </Button>
          </motion.div>
          
          <motion.div 
            style={cardStyle}
            className="mt-16"
          >
             <div className="glass-card p-6 md:p-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-semibold">Performance Dashboard</div>
                  <div className="flex items-baseline">
                    <span className="text-sm text-primary font-mono">+38% ROAS</span>
                    <span className="ml-2 text-xs text-muted-foreground">(last 7 days)</span>
                  </div>
                </div>
                <div className="w-full bg-black/20 h-2 rounded-full mb-6">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: '0%' }}
                    animate={inView ? { width: '75%' } : {}}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">+42%</div>
                    <div className="text-xs text-muted-foreground">Average ROAS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">-28%</div>
                    <div className="text-xs text-muted-foreground">CPA Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">4.2x</div>
                    <div className="text-xs text-muted-foreground">Ads Revenue</div>
                  </div>
                </div>
              </div>
              <motion.div variants={item} className="text-xs text-muted-foreground mt-4">
                No fluff, no false promises - just real, measurable results.
              </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground/50"/>
      </motion.div>
    </section>
  );
};

export default HeroSection;

// reasoning: Hero section uses motion and staggered animations to draw attention
// The scroll depth is tracked for analytics. The CTA is prominently placed with
// social proof ("Guaranteed +28% ROAS") to reduce conversion friction. 