import { Button } from '@/app/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partnerLogos = [
  {
    src: '/images/KlaviyoExpert.webp',
    alt: 'Klaviyo Expert Partner',
    width: 150,
    height: 50,
  },
  {
    src: '/images/shopify-partners.webp',
    alt: 'Shopify Partner',
    width: 150,
    height: 50,
  },
  {
    src: '/images/MetaBusinessPartner.webp',
    alt: 'Meta Business Partner',
    width: 150,
    height: 50,
  },
];

const LogoBar = () => {
  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted by Industry Leaders
          </h2>
          <div className="flex justify-center items-center gap-x-8 md:gap-x-12 lg:gap-x-16 mt-6">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LogoBar; 