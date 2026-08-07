import { Variants } from 'framer-motion';

export const cardFlipVariants: Variants = {
  front: { 
    rotateY: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  back: { 
    rotateY: 180,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  }
};

export const buttonPopVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  success: { 
    scale: [1, 1.2, 1],
    transition: { duration: 0.4, type: 'spring' }
  }
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, type: 'spring', bounce: 0.4 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};
