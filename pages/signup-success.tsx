import { motion } from 'framer-motion';
import { useLocale } from '../hooks/useLocale';
import Layout from '../components/Layout';
import { formStyles } from '../constants/componentStyles';

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const messageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const buttonVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4 },
  },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function SignupSuccess() {
  const { t, direction } = useLocale();
  const textAlign = direction === 'rtl' ? 'right' : 'left';

  const handleBackHome = () => {
    window.location.href = '/';
  };

  return (
    <Layout>
      <motion.section
        style={{
          ...formStyles.wrapper,
          direction: direction as 'ltr' | 'rtl',
          textAlign,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
      {/* HEADER WITH LOGO */}
      <motion.div
        style={{
          marginBottom: '3rem',
          textAlign: 'center',
        }}
      >
        <motion.img
          src="/resources/logo.png"
          alt="Twist"
          style={{
            height: '60px',
            marginBottom: '1rem',
          }}
          variants={messageVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>

      {/* SUCCESS MESSAGE */}
      <motion.div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '3rem',
        }}
        variants={messageVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem',
          }}
        >
          {t('signupSuccess.title')}
        </motion.h1>

        <motion.p
          style={{
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: 1.8,
            marginBottom: '2rem',
            whiteSpace: 'pre-line',
          }}
        >
          {t('signupSuccess.message')}
        </motion.p>

        <motion.p
          style={{
            fontSize: '1rem',
            color: '#999',
            lineHeight: 1.6,
          }}
        >
          {t('signupSuccess.waitMessage')}
        </motion.p>
      </motion.div>

      {/* BACK BUTTON */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={handleBackHome}
        style={{
          ...formStyles.cta,
          padding: '12px 40px',
          fontSize: '1.1rem',
        } as any}
      >
        {t('signupSuccess.button')}
      </motion.button>
      </motion.section>
    </Layout>
  );
}
