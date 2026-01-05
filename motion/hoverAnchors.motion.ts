import { motionTokens } from '../tokens/motion';
import { cubicBezier } from 'framer-motion';

export const anchorContainer = {
  rest: {
    opacity: 1,
  },
  active: {
    opacity: 1,
  },
};

export const titleVariants = {
  rest: {
    color: 'var(--brand-primary)',
    fontSize: '1.4rem',
    x: 0,
  },
  active: {
    color: 'var(--brand-primary)',
    fontSize: '1.55rem',
    x: 4,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

export const lineVariants = {
  rest: {
    width: 0,
    opacity: 0,
  },
  active: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.12,
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

export const bodyTextVariants = {
  rest: {
    opacity: 0,
    height: 0,
    y: 8,
  },
  active: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: {
      duration: motionTokens.base,
      ease: motionTokens.ease,
      delay: 0.24,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: 8,
    transition: {
      duration: motionTokens.fast,
      ease: motionTokens.ease,
    },
  },
};

export const iconVariants = {
  rest: {
    scale: 3.5,
    rotate: 0,
    y: 12,
  },
  active: {
    scale: 1.1,
    rotate: 8,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 30,
      mass: 1.5,
    },
  },
  settled: {
    scale: 1,
    rotate: 0,
    y: 8,
    x: 0,
    transition: {
      type: 'tween' as const,
      duration: 1.2,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
  hover: {
    x: 6,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
};
