import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
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
import { useLocale } from '../hooks/useLocale';

export default function SignupForm() {
  const { t } = useLocale();
  const { locale } = useRouter();
  const isHebrew = locale === 'he';
  const direction = isHebrew ? 'rtl' : 'ltr';
  const textAlign = isHebrew ? 'right' : 'left';
  
  const [emailFilled, setEmailFilled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
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
    setFormData({ ...formData, email: e.target.value });
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailFilled(!!e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <motion.section
      style={{ ...formStyles.wrapper, direction, textAlign }}
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

    {/* <motion.h1 {...fadeInUp} style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.6, marginBottom: '1rem' }}>
        {t('signupForm.titleDescription')}
      </motion.h1>
      <motion.p {...fadeInUp} style={{ fontSize: '0.95rem', color: '#999', lineHeight: 1.6, marginBottom: '3rem', whiteSpace: 'pre-line' }}>
        {t('signupForm.description')}
      </motion.p> */}

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
          <motion.label style={formStyles.label} variants={labelVariants} initial="initial" animate="animate">
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
          {emailFilled && (
            <motion.div
              variants={formFieldsContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div variants={formFieldVariants}>
                <motion.label style={formStyles.label} variants={labelVariants} initial="initial" animate="animate">
                  {t('signupForm.customizeLabel')}
                </motion.label>
                <motion.select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  style={formStyles.select}
                  variants={selectVariants}
                  initial="initial"
                  animate="animate"
                >
                  <option value="">{t('signupForm.genderSelect')}</option>
                  <option value="male">{t('signupForm.genderMale')}</option>
                  <option value="female">{t('signupForm.genderFemale')}</option>
                </motion.select>
              </motion.div>

              <motion.div variants={formFieldVariants}>
                <motion.label style={formStyles.label} variants={labelVariants} initial="initial" animate="animate">
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
                <motion.label style={formStyles.label} variants={labelVariants} initial="initial" animate="animate">
                  {t('signupForm.residenceLabel')}
                </motion.label>
                <motion.input
                  type="text"
                  placeholder={t('signupForm.residenceInput')}
                  value={formData.residence}
                  onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                  style={formStyles.input}
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                />
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
        >
          {t('signupForm.submitButton')}
        </motion.button>

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
