import { motionTokens } from '../tokens/motion';

/**
 * SignupForm Motion Variants
 * Comprehensive animation configurations for all SignupForm elements
 */

// Container for the entire form section
export const formContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};

// Header section (logo and slogan)
export const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
    },
  },
};

// Logo image
export const logoVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Slogan text
export const sloganVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.1,
    },
  },
};

// Main title
export const titleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.slow,
      ease: motionTokens.ease,
      delay: 0.2,
    },
  },
};

// Subtitle
export const subtitleVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.3,
    },
  },
};

// Form container
export const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.4,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Individual form field (email, gender, age, residence)
export const formFieldVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Animated form fields wrapper (reveals when email is filled)
export const formFieldsContainerVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Label text
export const labelVariants = {
  initial: { opacity: 0, x: -8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Input field
export const inputVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  focus: {
    scale: 1.01,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Select dropdown
export const selectVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  focus: {
    scale: 1.01,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Submit button
export const submitButtonVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

// Trust text (small disclaimer)
export const trustTextVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: motionTokens.slow,
      ease: motionTokens.ease,
      delay: 0.5,
    },
  },
};

// HoverAnchors wrapper
export const hoverAnchorsContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.35,
    },
  },
};
