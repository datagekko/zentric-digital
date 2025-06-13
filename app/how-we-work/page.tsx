'use client';

import { Button } from '../components/ui/button';
import Footer from '../components/sections/Footer';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Navigation from '../components/ui/Navigation';
import { useLeadForm } from '../contexts/LeadFormContext';

export default function HowWeWork() {
  const { openLeadForm } = useLeadForm();

  return (
    <main className="overflow-x-hidden">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">How We Work</h1>
        
        <div className="space-y-16">
          {/* Introduction Section */}
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl font-semibold mb-8">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-4">At Zentric Digital, we follow a methodical approach designed to maximize your growth potential. Our process combines strategic planning, creative execution, and data-driven optimization to deliver measurable results.</p>
          </div>
          
          {/* Process Timeline Component */}
          <ProcessTimeline />
          
          {/* CTA Section */}
          <div className="glass-card p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">Ready to Experience Our Process?</h2>
              <p className="text-xl text-muted-foreground mb-8">Schedule a discovery call to see how our proven approach can transform your business.</p>
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