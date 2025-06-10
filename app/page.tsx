'use client';

import { useEffect } from 'react';
import HeroSection from './components/sections/HeroSection';
import CredibilityBar from './components/sections/CredibilityBar';
import PasSlab from './components/sections/PasSlab';
import OfferStack from './components/sections/OfferStack';
import ProofWall from './components/sections/ProofWall';
import ProcessTimeline from './components/sections/ProcessTimeline';
import HowWeOperate from './components/sections/HowWeOperate';
import ComparisonSection from './components/sections/ComparisonSection';
import CaseStudies from './components/sections/CaseStudies';
import RiskReversal from './components/sections/RiskReversal';
import FinalCta from './components/sections/FinalCta';
import Footer from './components/sections/Footer';

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
    <main className="overflow-x-hidden">
      <HeroSection />
      <CredibilityBar />
      <PasSlab />
      <OfferStack />
      <ProofWall />
      <ProcessTimeline />
      <HowWeOperate />
      <ComparisonSection />
      <CaseStudies />
      <RiskReversal />
      <FinalCta />
      <Footer />
    </main>
  );
} 