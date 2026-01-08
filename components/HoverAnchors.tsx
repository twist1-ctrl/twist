import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/hover-anchors.module.css';
import {
  anchorContainer,
  titleVariants,
  lineVariants,
  bodyTextVariants,
  iconVariants,
} from '../motion/hoverAnchors.motion';
import React from 'react';
import { useTranslation } from 'next-i18next';

interface Anchor {
  title: string;
  body: string;
  icon: string;
}

interface HoverAnchorsProps {
  anchors: Anchor[];
}

function AnchorItem({ title, body, icon }: { title: string; body: string; icon: string }) {
  const { i18n } = useTranslation();
  const direction = i18n.language === 'he' ? 'rtl' : 'ltr';
  const [isActive, setIsActive] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const lines = body.split('\n');

  const isOpen = isActive || isToggled;

  // כשהמשתמש מעביר עכבר או מקליק - מתחילה הקפיצה
  // אחרי 3 שניות - האיקון עומד בשקט
  React.useEffect(() => {
    if (isOpen && !isSettled) {
      const timer = setTimeout(() => {
        setIsSettled(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (!isOpen) {
      setIsSettled(false);
    }
  }, [isOpen]);

  const handleTap = () => {
    setIsToggled(!isToggled);
  };

  return (
    <motion.button
      type="button"
      className={styles.anchorButton}
      animate={isOpen ? 'active' : 'rest'}
      variants={anchorContainer}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onTapStart={() => setIsActive(true)}
      onTapCancel={() => setIsActive(false)}
      onTap={handleTap}
      role="button"
      aria-pressed={isOpen}
      style={{ textAlign: direction === 'rtl' ? 'right' : 'left' } as any}
    >
      <div className={styles.titleWrapper}>
        <motion.span className={styles.title} variants={titleVariants}>
          {title}
        </motion.span>
        <motion.div
        initial="rest"
          variants={iconVariants}
          animate={isSettled ? 'settled' : isOpen ? 'active' : 'rest'}
          whileHover={isSettled ? 'hover' : undefined}
        >
          <Image
            src={icon}
            alt={title}
            width={40}
            height={40}
            className={styles.icon}
          />
        </motion.div>
      </div>

      <motion.div className={styles.line} variants={lineVariants} />

      <motion.p className={styles.body} variants={bodyTextVariants}>
        {lines.map((line, idx) => (
          <span key={line + idx}>
            {line}
            {idx < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </motion.p>
    </motion.button>
  );
}

export default function HoverAnchors({ anchors }: HoverAnchorsProps) {
  return (
    <div className={styles.container}>
      {anchors.map((anchor) => (
        <AnchorItem key={anchor.title} title={anchor.title} body={anchor.body} icon={anchor.icon} />
      ))}
    </div>
  );
}
