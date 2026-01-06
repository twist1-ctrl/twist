import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import {
  formFieldMotion,
  fadeInUp,
  titleFadeIn,
  CTAButtonMotion,
} from '../constants/animations';
import {
  formContainerVariants,
  headerVariants,
  logoVariants,
  sloganVariants,
  titleVariants,
  subtitleVariants,
  formVariants,
  formFieldsContainerVariants,
  formFieldVariants,
  labelVariants,
  inputVariants,
  selectVariants,
  submitButtonVariants,
  trustTextVariants,
  hoverAnchorsContainerVariants,
} from '../motion/signupForm.motion';
import { formStyles } from '../constants/componentStyles';
import HoverAnchors from './HoverAnchors';
import GenderSelector from './GenderSelector';
import CitySelector from './CitySelector';
import { useLocale } from '../hooks/useLocale';
import { addClientToPulseem } from '../services/pulseem';

export default function SignupForm() {
  const { t, direction } = useLocale();
  const { push } = useRouter();
  const textAlign = direction === 'rtl' ? 'right' : 'left';
  
  const [emailFilled, setEmailFilled] = useState(false);
  const [fieldsOpened, setFieldsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    gender: '',
    age: '',
    residence: '',
  });

  const anchors = [
    { title: t('signupForm.knowledge'), body: t('signupForm.knowledgeBody'), icon: '/resources/icons/brainMed.svg' },
    { title: t('signupForm.opinion'), body: t('signupForm.opinionBody'), icon: '/resources/icons/speak.svg' },
    { title: t('signupForm.progress'), body: t('signupForm.progressBody'), icon: '/resources/icons/arrowUp.svg' },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setEmailFilled(!!value);
    if (value && !fieldsOpened) {
      setFieldsOpened(true);
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailFilled(!!e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Split full name: if only one word, it's firstName; otherwise last word is lastName
      const nameParts = formData.fullName.trim().split(' ').filter(word => word.length > 0);
      let firstName = '';
      let lastName = '';

      if (nameParts.length === 1) {
        // Only one word - use as firstName
        firstName = nameParts[0];
        lastName = '';
      } else {
        // Multiple words - last word is lastName, rest is firstName
        lastName = nameParts[nameParts.length - 1];
        firstName = nameParts.slice(0, -1).join(' ');
      }

      // Calculate birth date from age: 01/01/(currentYear - age)
      const currentYear = new Date().getFullYear();
      const birthYear = currentYear - parseInt(formData.age || '0');
      const birthDate = `01/01/${birthYear}`;

      // Map gender to Hebrew if needed
      const genderMap: Record<string, string> = {
        'male': 'גבר',
        'female': 'אשה',
      };
      const genderValue = genderMap[formData.gender] || formData.gender;

      const clientData = {
        email: formData.email,
        firstName,
        lastName,
        gender: genderValue,
        birthDate,
        city: formData.residence, // residence maps to city field
      };

      const response = await addClientToPulseem(clientData);
      
      // Check for error first (Pulseem can return status: 'Success' with an error field)
      if (response.error) {
        setError(response.error);
      } else if (response.status === 'Success') {
        // Redirect to success page
        push('/signup-success');
      } else {
        setError('Failed to process signup');
      }
    } catch (err) {
      console.error('❌ [Form] Error occurred:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      style={{ ...formStyles.wrapper, direction, textAlign } as any}
      variants={formContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* HEADER WITH LOGO AND MAGAZINE INFO */}
      <motion.div style={formStyles.header} variants={headerVariants}>
        <motion.div style={formStyles.logo} variants={logoVariants} whileHover="hover">
          <img src="/resources/logo.png" alt="Twist" style={formStyles.logoImage as React.CSSProperties} />
        </motion.div>
        <motion.h6 style={formStyles.slogan} variants={sloganVariants}>
          {t('home.slogen')}
        </motion.h6>
      </motion.div>

      {/* TITLE WITH FADE-IN ANIMATION */}
      <motion.h1
        variants={titleVariants}
        initial="initial"
        animate="animate"
        style={{ ...formStyles.title, textAlign: 'center' }}
      >
        {t('signupForm.titleDescription')}
        <motion.span
          initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50, rotateZ: direction === 'rtl' ? 15 : -15 }}
          animate={{ opacity: 1, x: 0, rotateZ: 0 }}
          transition={{
            duration: 3,
            ease: 'easeOut',
          }}
          style={{
            color: '#c7403a',
            display: 'inline-block',
          }}
        >
          {t('signupForm.titleDescriptionHighlight')}
        </motion.span>
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        variants={subtitleVariants}
        initial="initial"
        animate="animate"
        style={{ ...formStyles.subtitle, textAlign: 'center', whiteSpace: 'pre-line' }}
      >
        {t('signupForm.description')}
      </motion.p>


      {/* HOVER ANCHORS */}
      <motion.div
        variants={hoverAnchorsContainerVariants}
        initial="initial"
        animate="animate"
      >
        <HoverAnchors anchors={anchors} />
      </motion.div>

      {/* FORM */}
      <motion.form
        variants={formVariants}
        initial="initial"
        animate="animate"
        onSubmit={handleSubmit}
        style={formStyles.form}
      >
        <motion.div variants={formFieldVariants}>
          <motion.label style={{ ...formStyles.label, textAlign }} variants={labelVariants} initial="initial" animate="animate">
            {t('signupForm.emailLabel')}
          </motion.label>
          <motion.input
            type="email"
            placeholder={t('signupForm.emailInput')}
            value={formData.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            style={formStyles.input}
            variants={inputVariants}
            initial="initial"
            animate="animate"
            required
          />
        </motion.div>

        <AnimatePresence>
          {fieldsOpened && (
            <motion.div
              variants={formFieldsContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div variants={formFieldVariants}>
                <motion.label style={{ ...formStyles.label, textAlign }} variants={labelVariants} initial="initial" animate="animate">
                  {t('signupForm.fullNameLabel')}
                </motion.label>
                <motion.input
                  type="text"
                  placeholder={t('signupForm.fullNameInput')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={formStyles.input}
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <motion.label style={{ ...formStyles.label, textAlign }} variants={labelVariants} initial="initial" animate="animate">
                  {t('signupForm.customizeLabel')}
                </motion.label>
                <GenderSelector
                  value={formData.gender}
                  onChange={(value) => setFormData({ ...formData, gender: value })}
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <motion.label style={{ ...formStyles.label, textAlign }} variants={labelVariants} initial="initial" animate="animate">
                  {t('signupForm.ageLabel')}
                </motion.label>
                <motion.input
                  type="number"
                  placeholder={t('signupForm.ageInput')}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  style={formStyles.input}
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <motion.label style={{ ...formStyles.label, textAlign }} variants={labelVariants} initial="initial" animate="animate">
                  {t('signupForm.residenceLabel')}
                </motion.label>
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                >
                  <CitySelector
                    value={formData.residence}
                    onChange={(value) => setFormData({ ...formData, residence: value })}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          variants={submitButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          type="submit"
          style={formStyles.cta as any}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress 
              size={24} 
              sx={{ color: 'white' }}
            />
          ) : (
            t('signupForm.submitButton')
          )}
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              padding: '16px',
              backgroundColor: '#fee',
              borderLeft: '4px solid #f66',
              borderRadius: '4px',
              color: '#c33',
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {t('signupForm.errorTitle')}
            </div>
            <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              {t('signupForm.errorMessage')}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#999' }}>
              {t('signupForm.errorRetry')}
            </div>
          </motion.div>
        )}

        <motion.small
          style={formStyles.trust}
          variants={trustTextVariants}
          initial="initial"
          animate="animate"
        >
          {t('signupForm.trustText')}
        </motion.small>
      </motion.form>
    </motion.section>
  );
}
