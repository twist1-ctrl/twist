import { motionTokens } from '../tokens/motion';

/**
 * Global Brand Motion Animations
 * Reusable animation configurations across the application
 */



export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: motionTokens.base, ease: motionTokens.ease },
};

export const titleFadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: motionTokens.slow, ease: motionTokens.ease, delay: 0.2 },
};

export const formFieldMotion = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: motionTokens.base, ease: motionTokens.ease },
};

export const CTAButtonMotion = {
  whileHover: {
    scale: 1.02,
    backgroundColor: 'var(--brand-primary)',
    transition: { duration: motionTokens.base, ease: motionTokens.ease },
  },
  whileTap: { scale: 0.98 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: motionTokens.base, ease: motionTokens.ease },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: motionTokens.base, ease: motionTokens.ease },
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: motionTokens.base, ease: motionTokens.ease },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: motionTokens.base, ease: motionTokens.ease },
};
export const circleHoverMotion = {
  rest: {
    borderColor: 'var(--brand-primary)',
    y: 0,
  },
  hover: {
    borderColor: 'var(--brand-secondary)',
    y: -8,
    transition: { duration: motionTokens.base, ease: motionTokens.ease },
  },
};