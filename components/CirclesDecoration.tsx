import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants/colors';

interface CirclesDecorationProps {
  show?: boolean;
}

const circleColors = [
  { default: COLORS.primary, hover: COLORS.secondary }, // Green -> Red
  { default: COLORS.secondary, hover: COLORS.primary }, // Red -> Green
  { default: COLORS.primary, hover: COLORS.secondary }, // Green -> Red
  { default: COLORS.secondary, hover: COLORS.primary }, // Red -> Green
  { default: COLORS.primary, hover: COLORS.secondary }, // Green -> Red
  { default: COLORS.secondary, hover: COLORS.primary }, // Red -> Green
  { default: COLORS.primary, hover: COLORS.secondary }, // Green -> Red
  { default: COLORS.secondary, hover: COLORS.primary }, // Red -> Green
  { default: COLORS.primary, hover: COLORS.secondary }, // Green -> Red
];

const circleConfigs = [
  { size: 280, top: '5%', yOffset: 20, xOffset: 15, delay: 0 },
  { size: 180, top: '15%', yOffset: 25, xOffset: -10, delay: 0.3 },
  { size: 120, top: '28%', yOffset: 30, xOffset: 20, delay: 0.6 },
  { size: 160, top: '42%', yOffset: 18, xOffset: -15, delay: 0.9 },
  { size: 100, top: '55%', yOffset: 28, xOffset: 25, delay: 1.2 },
  { size: 140, top: '66%', yOffset: 22, xOffset: -12, delay: 1.5 },
  { size: 110, top: '76%', yOffset: 32, xOffset: 18, delay: 1.8 },
  { size: 200, top: '85%', yOffset: 20, xOffset: -20, delay: 0.2 },
  { size: 90, top: '92%', yOffset: 26, xOffset: 16, delay: 0.8 },
];

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export default function CirclesDecoration({ show = true }: CirclesDecorationProps) {
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '350px',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {circleConfigs.map((config, idx) => (
        <motion.div
          key={idx}
          animate={{
            y: [0, -config.yOffset, 0],
            x: [0, config.xOffset, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: config.delay,
          }}
          onMouseEnter={() => setHoveredCircle(idx)}
          onMouseLeave={() => setHoveredCircle(null)}
          style={{
            position: 'absolute',
            width: `${config.size}px`,
            height: `${config.size}px`,
            borderRadius: '50%',
            border: '3px solid',
            borderColor: hoveredCircle === idx ? circleColors[idx].hover : circleColors[idx].default,
            backgroundColor: 'transparent',
            top: config.top,
            right: `-${config.size / 2}px`,
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'border-color 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}
