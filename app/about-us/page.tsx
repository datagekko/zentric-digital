'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import Navigation from '../components/ui/Navigation';
import Image from 'next/image';
import { useLeadForm } from '../contexts/LeadFormContext';
import { Button } from '../components/ui/button';

export default function AboutUs() {
  const { openLeadForm } = useLeadForm();

  return (
    <main className="overflow-x-hidden">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">About Us</h1>
        
        <div className="space-y-16">
          {/* Mission Section */}
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-semibold mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">We help e-commerce brands transform underperforming marketing funnels into high-ROAS profit machines. Our approach combines data-driven media buying with strategic funnel optimization to create sustainable, scalable growth systems.</p>
            <p className="text-lg text-muted-foreground">At Zentric Digital, we believe in transparency, measurable results, and genuine partnership. We only win when you win, which is why we build performance guarantees into every client relationship.</p>
          </div>
          
          {/* Team Section */}
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center text-center">
              <Image
                src="/images/marcus-johnson.svg"
                alt="Photo of Kilian Dreher"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mb-4 object-cover"
              />
                <h3 className="text-xl font-semibold mb-1">Kilian Dreher</h3>
                <p className="text-primary mb-3">Co-Founder</p>
                <p className="text-muted-foreground text-sm">Entrepreneur and growth consultant with 5+ years of experience scaling e-commerce brands from 0 up to 8 figures.</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="flex flex-col items-center text-center">
              <Image
                src="/images/elena-rodriguez.svg"
                alt="Photo of Oliver Hauritz"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full mb-4 object-cover"
              />
                <h3 className="text-xl font-semibold mb-1">Oliver Hauritz</h3>
                <p className="text-primary mb-3">Co-Founder</p>
                <p className="text-muted-foreground text-sm">Expert in driving targeted traffic and optimising conversion funnels to maximise profitability. He turns clicks into customers.</p>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-semibold mb-8">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">1</span>
                  Data-Driven Decisions
                </h3>
                <p className="text-muted-foreground mb-4">We let data guide our strategy, not assumptions. Every decision is backed by numbers and performance metrics.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">2</span>
                  Radical Transparency
                </h3>
                <p className="text-muted-foreground mb-4">Full visibility into your campaigns, spending, and results. No hidden fees, no markup on ad spend.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">3</span>
                  Continuous Optimization
                </h3>
                <p className="text-muted-foreground mb-4">We're never satisfied with "good enough." Our iterative process ensures consistent improvement over time.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">4</span>
                  Results Guarantee
                </h3>
                <p className="text-muted-foreground mb-4">We stand behind our work with performance guarantees. If we don't deliver, you don't pay full price.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="glass-card p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">Ready to Work With Us?</h2>
              <p className="text-lg text-muted-foreground mb-8">Schedule a discovery call to see if we're the right fit for your e-commerce growth goals.</p>
              <Button onClick={openLeadForm} variant="primary" size="lg">
                Book Free Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 