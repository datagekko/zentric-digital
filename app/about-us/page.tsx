'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import Navigation from '../components/ui/Navigation';
import { useLeadForm } from '../contexts/LeadFormContext';

export default function AboutUs() {
  const { openLeadForm } = useLeadForm();

  return (
    <main className="overflow-x-hidden bg-nordic-ivory">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">About Us</h1>
        
        <div className="space-y-16">
          {/* Mission Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Our Mission</h2>
            <p className="text-lg text-onyx/80 mb-6">We help e-commerce brands transform underperforming marketing funnels into high-ROAS profit machines. Our approach combines data-driven media buying with strategic funnel optimization to create sustainable, scalable growth systems.</p>
            <p className="text-lg text-onyx/80">At Zentric Digital, we believe in transparency, measurable results, and genuine partnership. We only win when you win, which is why we build performance guarantees into every client relationship.</p>
          </div>
          
          {/* Team Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 bg-iris-purple/10 rounded-full mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-iris-purple/20 to-mint-green/20"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Sarah Chen</h3>
                <p className="text-iris-purple mb-3">Founder & CEO</p>
                <p className="text-onyx/70 text-sm">Ex-Facebook ads strategist with 7+ years experience scaling e-commerce brands from 6 to 8 figures.</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 bg-iris-purple/10 rounded-full mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-iris-purple/20 to-mint-green/20"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Marcus Johnson</h3>
                <p className="text-iris-purple mb-3">Head of Media Buying</p>
                <p className="text-onyx/70 text-sm">Managed $15M+ in ad spend with an average ROAS of 4.2x across diverse e-commerce verticals.</p>
              </div>
              
              {/* Team Member 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 bg-iris-purple/10 rounded-full mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-iris-purple/20 to-mint-green/20"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1">Elena Rodriguez</h3>
                <p className="text-iris-purple mb-3">Creative Director</p>
                <p className="text-onyx/70 text-sm">Award-winning designer specializing in high-conversion ad creative and landing page optimization.</p>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="bg-deep-navy text-white rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-iris-purple/30 rounded-full flex items-center justify-center text-mint-green">1</span>
                  Data-Driven Decisions
                </h3>
                <p className="text-white/80 mb-4">We let data guide our strategy, not assumptions. Every decision is backed by numbers and performance metrics.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-iris-purple/30 rounded-full flex items-center justify-center text-mint-green">2</span>
                  Radical Transparency
                </h3>
                <p className="text-white/80 mb-4">Full visibility into your campaigns, spending, and results. No hidden fees, no markup on ad spend.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-iris-purple/30 rounded-full flex items-center justify-center text-mint-green">3</span>
                  Continuous Optimization
                </h3>
                <p className="text-white/80 mb-4">We're never satisfied with "good enough." Our iterative process ensures consistent improvement over time.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-3 w-8 h-8 bg-iris-purple/30 rounded-full flex items-center justify-center text-mint-green">4</span>
                  Results Guarantee
                </h3>
                <p className="text-white/80 mb-4">We stand behind our work with performance guarantees. If we don't deliver, you don't pay full price.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-iris-purple/10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Work With Us?</h2>
              <p className="text-lg text-onyx/80 mb-8">Schedule a discovery call to see if we're the right fit for your e-commerce growth goals.</p>
              <button 
                onClick={openLeadForm}
                className="bg-iris-purple hover:bg-iris-purple-light text-white py-4 px-8 rounded-full font-semibold transition-colors duration-300"
              >
                Book Free Discovery Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 