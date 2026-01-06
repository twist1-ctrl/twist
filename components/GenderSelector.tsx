import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/gender-selector.module.css';
import { useLocale } from '../hooks/useLocale';

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GenderSelector({ value, onChange }: GenderSelectorProps) {
  const { t, direction } = useLocale();

  const options = [
    {
      value: 'male',
      label: t('signupForm.genderMale'),
      icon: '👨',
    },
    {
      value: 'female',
      label: t('signupForm.genderFemale'),
      icon: '👩',
    },
  ];

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <motion.button
          key={option.value}
          type="button"
          className={`${styles.button} ${value === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.icon}>{option.icon}</span>
          <span className={styles.label}>{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
