'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/sections/Footer';
import Navigation from '../components/ui/Navigation';
import { useLeadForm } from '../contexts/LeadFormContext';
import { Button } from '../components/ui/button';
import { Grid, List } from 'lucide-react';

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
    <main className="min-h-screen">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">Case Studies</h1>
        
        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "secondaryBrand"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-full p-1">
            <Button
              onClick={() => setIsGridView(true)}
              variant={isGridView ? 'primary' : 'ghost'}
              size="icon"
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setIsGridView(false)}
              variant={!isGridView ? 'primary' : 'ghost'}
              size="icon"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Case Studies Grid/List */}
        <div className={`grid ${isGridView ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
          {filteredCases.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{caseStudy.title}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {caseStudy.metrics.map((metric, index) => (
                    <div key={index} className="bg-primary/10 p-3 rounded-lg text-center">
                      <div className="text-primary font-bold text-xl md:text-2xl">{metric.value}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6">{caseStudy.description}</p>
                
                <Button variant="link" className="px-0">
                  Read Case Study
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 glass-card p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Want Similar Results?</h2>
            <p className="text-xl text-muted-foreground mb-8">Book a discovery call to see how we can transform your marketing performance.</p>
            <Button onClick={openLeadForm} variant="primary" size="lg">
              Book Free Discovery Call
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 