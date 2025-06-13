'use client';

import Footer from '../components/sections/Footer';
import Navigation from '../components/ui/Navigation';

export default function Privacy() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">Privacy Policy</h1>
        <div className="prose prose-invert mx-auto">
          <h2>1. Introduction</h2>
          <p>
            Welcome to our Privacy Policy. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
          </p>
          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following: Name and Contact Data. We collect your first and last name, email address, postal address, phone number, and other similar contact data.
          </p>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <h2>4. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <h2>5. How Long Do We Keep Your Information?</h2>
          <p>
            We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.
          </p>
          <h2>6. How Do We Keep Your Information Safe?</h2>
          <p>
            We aim to protect your personal information through a system of organizational and technical security measures.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
} 