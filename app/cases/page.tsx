'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import Navigation from '../components/ui/Navigation';
import { useLeadForm } from '../contexts/LeadFormContext';

export default function Cases() {
  const [activeTab, setActiveTab] = useState('all');
  const [isGridView, setIsGridView] = useState(true);
  const { openLeadForm } = useLeadForm();

  const tabs = [
    { id: 'all', label: 'All Cases' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'saas', label: 'SaaS' },
    { id: 'subscription', label: 'Subscription' }
  ];

  const caseStudies = [
    {
      id: 1,
      title: 'FashionBrand: 324% ROAS Increase in 60 Days',
      category: 'ecommerce',
      metrics: [
        { label: 'ROAS Increase', value: '324%' },
        { label: 'CPA Reduction', value: '42%' },
        { label: 'Revenue Growth', value: '2.8x' }
      ],
      description: 'How we transformed an underperforming ad account into a high-ROAS machine for this fashion e-commerce brand.'
    },
    {
      id: 2,
      title: 'SaaS Platform: Customer Acquisition Cost Cut by 38%',
      category: 'saas',
      metrics: [
        { label: 'CAC Reduction', value: '38%' },
        { label: 'Demo Requests', value: '+156%' },
        { label: 'LTV:CAC Ratio', value: '4.2:1' }
      ],
      description: 'Strategic funnel optimization and targeted audience refinement for a B2B SaaS platform.'
    },
    {
      id: 3,
      title: 'Subscription Box: From $50K to $250K MRR in 90 Days',
      category: 'subscription',
      metrics: [
        { label: 'Revenue Growth', value: '5x' },
        { label: 'Retention Rate', value: '+28%' },
        { label: 'Acquisition Cost', value: '-32%' }
      ],
      description: 'Scaling a niche subscription box service with multi-channel acquisition and retention strategies.'
    },
    {
      id: 4,
      title: 'BeautyBrand: Scaling to 7-Figures with Meta Ads',
      category: 'ecommerce',
      metrics: [
        { label: 'Ad Spend', value: '$150K' },
        { label: 'Revenue', value: '$720K' },
        { label: 'ROAS', value: '4.8x' }
      ],
      description: 'How we helped a beauty brand break through the 7-figure revenue mark with optimized Meta advertising.'
    }
  ];

  const filteredCases = activeTab === 'all' 
    ? caseStudies 
    : caseStudies.filter(item => item.category === activeTab);

  return (
    <main className="bg-nordic-ivory min-h-screen">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">Case Studies</h1>
        
        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-iris-purple text-white' 
                    : 'bg-white hover:bg-iris-purple/10 text-deep-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* View Toggle */}
          <div className="bg-white rounded-full p-1 flex">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-full ${
                isGridView ? 'bg-iris-purple text-white' : 'text-deep-navy'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-full ${
                !isGridView ? 'bg-iris-purple text-white' : 'text-deep-navy'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Case Studies Grid/List */}
        <div className={`grid ${isGridView ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {filteredCases.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{caseStudy.title}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {caseStudy.metrics.map((metric, index) => (
                    <div key={index} className="bg-nordic-ivory/50 p-3 rounded-lg text-center">
                      <div className="text-iris-purple font-bold text-xl md:text-2xl">{metric.value}</div>
                      <div className="text-xs md:text-sm text-onyx/70">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <p className="text-onyx/80 mb-6">{caseStudy.description}</p>
                
                <button className="text-iris-purple font-medium flex items-center">
                  Read Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-deep-navy text-white rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Want Similar Results?</h2>
            <p className="text-xl text-white/80 mb-8">Book a discovery call to see how we can transform your marketing performance.</p>
            <button 
              onClick={openLeadForm}
              className="bg-iris-purple hover:bg-iris-purple-light text-white py-4 px-8 rounded-full font-semibold transition-colors duration-300"
            >
              Book Free Discovery Call
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 