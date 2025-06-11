'use client';

import Footer from '../components/sections/Footer';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Navigation from '../components/ui/Navigation';
import { useLeadForm } from '../contexts/LeadFormContext';

export default function HowWeWork() {
  const { openLeadForm } = useLeadForm();

  return (
    <main className="overflow-x-hidden bg-nordic-ivory">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">How We Work</h1>
        
        <div className="space-y-16">
          {/* Introduction Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Our Approach</h2>
            <p className="text-lg text-onyx/80 mb-4">At Zentric Digital, we follow a methodical approach designed to maximize your growth potential. Our process combines strategic planning, creative execution, and data-driven optimization to deliver measurable results.</p>
          </div>
          
          {/* Process Timeline Component */}
          <ProcessTimeline />
          
          {/* CTA Section */}
          <div className="bg-deep-navy text-white rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Experience Our Process?</h2>
              <p className="text-xl text-white/80 mb-8">Schedule a discovery call to see how our proven approach can transform your business.</p>
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