'use client';

import Footer from '../components/sections/Footer';
import Navigation from '../components/ui/Navigation';

export default function Terms() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <div className="pt-32 pb-20 px-6 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center">Terms of Service</h1>
        <div className="prose prose-invert mx-auto">
          <h2>1. Terms</h2>
          <p>
            By accessing this Website, accessible from zentric.digital, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
          </p>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Zentric Digital's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            modify or copy the materials;
            use the materials for any commercial purpose or for any public display;
            attempt to reverse engineer any software contained on Zentric Digital's Website;
            remove any copyright or other proprietary notations from the materials; or
            transferring the materials to another person or "mirror" the materials on any other server.
          </p>
          <h2>3. Disclaimer</h2>
          <p>
            All the materials on Zentric Digital's Website are provided "as is". Zentric Digital makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Zentric Digital does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
          </p>
          <h2>4. Limitations</h2>
          <p>
            Zentric Digital or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Zentric Digital's Website, even if Zentric Digital or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
          </p>
          <h2>5. Revisions and Errata</h2>
          <p>
            The materials appearing on Zentric Digital's Website may include technical, typographical, or photographic errors. Zentric Digital will not promise that any of the materials in this Website are accurate, complete, or current. Zentric Digital may change the materials contained on its Website at any time without notice. Zentric Digital does not make any commitment to update the materials.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
} 