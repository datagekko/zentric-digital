'use client';

import { useEffect } from 'react';
import HeroSection from './components/sections/HeroSection';
import Comparison from './components/sections/Comparison';
import SolutionSection from './components/sections/SolutionSection';
import FinalCta from './components/sections/FinalCta';
import Footer from './components/sections/Footer';
import Navigation from './components/ui/Navigation';
import { LeadFormProvider } from './contexts/LeadFormContext';
import LogoBar from './components/sections/LogoBar';

export default function Home() {
  // Track scroll depth for analytics
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;
      
      // Would normally push to GTM/GA4
      console.log(`Scroll depth: ${Math.round(scrollPercentage)}%`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LeadFormProvider>
      <main className="overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <Comparison />
        <LogoBar />
        <SolutionSection />
        <FinalCta />
        <Footer />
      </main>
    </LeadFormProvider>
  );
}
