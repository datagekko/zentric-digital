'use client';

import { useEffect } from 'react';
import HeroSection from './components/sections/HeroSection';
import CredibilityBar from './components/sections/CredibilityBar';
import PasSlab from './components/sections/PasSlab';
import OfferStack from './components/sections/OfferStack';
import ProofWall from './components/sections/ProofWall';
import ProcessTimeline from './components/sections/ProcessTimeline';
import ComparisonSection from './components/sections/ComparisonSection';
import RiskReversal from './components/sections/RiskReversal';
import FinalCta from './components/sections/FinalCta';
import Footer from './components/sections/Footer';
import Navigation from './components/ui/Navigation';

export default function Home() {
  // Track scroll depth for analytics
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const scrollPercentage = (scrollPosition / (docHeight - windowHeight)) * 100;
      
      // Would normally push to GTM/GA4
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <CredibilityBar />
      <PasSlab />
      <OfferStack />
      <ProofWall />
      <ProcessTimeline />
      <ComparisonSection />
      <RiskReversal />
      <FinalCta />
      <Footer />
    </main>
  );
}
