'use client';

import { motion } from 'framer-motion';

interface CtaButtonProps {
  text: string;
  onClick: () => void;
  isSecondary?: boolean;
  compact?: boolean;
  className?: string;
}

const CtaButton = ({ 
  text, 
  onClick, 
  isSecondary = false, 
  compact = false,
  className = ''
}: CtaButtonProps) => {
  const btnClass = isSecondary 
    ? 'btn-secondary' 
    : 'btn-primary';
  
  const sizeClass = compact 
    ? 'py-2 px-4 text-sm' 
    : 'py-4 px-8 text-base';

  return (
    <motion.button
      whileHover={{ scale: isSecondary ? 1.02 : 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={`${btnClass} ${sizeClass} ${className}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default CtaButton; 