"use client";

import React, { useState, useRef } from 'react';
import styles from './apply.module.css';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ApplyPage() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    reason: '',
    commitment: '',
    experience: '',
    mentality: '',
    agreement: false
  });
  const [errors, setErrors] = useState({});

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
    if (!formData.reason.trim() || formData.reason.length < 50) newErrors.reason = 'Please explain in detail (min 50 chars)';
    if (!formData.commitment) newErrors.commitment = 'Selection is required';
    if (formData.commitment === '<1h') newErrors.commitment = 'Insufficient time commitment';
    if (!formData.experience) newErrors.experience = 'Selection is required';
    if (!formData.mentality.trim()) newErrors.mentality = 'This answer is required';
    if (!formData.agreement) newErrors.agreement = 'You must agree to proceed';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await addDoc(collection(db, 'team_applications'), {
        ...formData,
        status: 'pending',
        submittedAt: serverTimestamp(),
        viewed: false
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("There was an error submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>✦</div>
          <h2 className={styles.successTitle}>Application Received</h2>
          <p className={styles.successText}>
            Your application has been securely logged. Our team reviews every submission manually.<br /><br />
            Due to the volume of applications, only shortlisted candidates will be contacted via WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Exclusive Access</div>
        <h1 className={styles.headline}>MR ANAS NIDIR<br /><span className={styles.textGold}>DIGITAL BUSINESS TEAM</span></h1>
        <h2 className={styles.subheadline}>Serious Individuals Only</h2>
        <button onClick={scrollToForm} className={styles.ctaButton}>
          Apply Now
        </button>
      </section>

      {/* Pre-Qualification Section */}
      <section className={styles.preQual}>
        <div className={styles.qualGrid}>
          <div className={styles.qualCard}>
            <h3 className={`${styles.qualTitle} ${styles.textGold}`}>This IS For You If...</h3>
            <ul className={styles.list}>
              <ListItem icon="check" text="You are willing to work hard and stay consistent." />
              <ListItem icon="check" text="You have at least 1-2 hours daily to dedicate." />
              <ListItem icon="check" text="You can follow instructions without ego." />
              <ListItem icon="check" text="You understand that real business takes time." />
            </ul>
          </div>
          <div className={styles.qualCard}>
            <h3 className={styles.qualTitle} style={{ color: '#cf3737' }}>This Is NOT For You If...</h3>
            <ul className={styles.list}>
              <ListItem icon="cross" text="You are looking for a 'get rich quick' scheme." />
              <ListItem icon="cross" text="You make excuses instead of finding solutions." />
              <ListItem icon="cross" text="You are not willing to invest time in learning." />
              <ListItem icon="cross" text="You give up when things get difficult." />
            </ul>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className={styles.formSection}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Team Application</h2>
          <p className={styles.formSubtitle}>Complete the form below with total honesty.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          
          <InputGroup label="Full Name" error={errors.fullName}>
            <input 
              type="text" 
              name="fullName" 
              className={styles.input} 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
            />
          </InputGroup>

          <InputGroup label="Email Address" error={errors.email}>
            <input 
              type="email" 
              name="email" 
              className={styles.input} 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="name@example.com" 
            />
          </InputGroup>

          <InputGroup label="WhatsApp Number" error={errors.whatsapp}>
            <input 
              type="tel" 
              name="whatsapp" 
              className={styles.input} 
              value={formData.whatsapp} 
              onChange={handleChange} 
              placeholder="+123 456 7890" 
            />
          </InputGroup>

          <InputGroup label="Why do you want to join this team?" error={errors.reason}>
            <textarea 
              name="reason" 
              className={styles.textarea} 
              value={formData.reason} 
              onChange={handleChange} 
              placeholder="Tell us about your motivation..." 
            />
          </InputGroup>

          <InputGroup label="Daily Time Commitment" error={errors.commitment}>
            <select 
              name="commitment" 
              className={styles.select} 
              value={formData.commitment} 
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="<1h">Less than 1 hour (Not Eligible)</option>
              <option value="1-2h">1-2 Hours</option>
              <option value="2-4h">2-4 Hours</option>
              <option value="4h+">4+ Hours</option>
            </select>
          </InputGroup>

          <InputGroup label="Online Business Experience" error={errors.experience}>
            <select 
              name="experience" 
              className={styles.select} 
              value={formData.experience} 
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="none">None / Beginner</option>
              <option value="some">Some Experience</option>
              <option value="advanced">Advanced</option>
            </select>
          </InputGroup>

          <InputGroup label="When things don't work immediately, what will you do?" error={errors.mentality}>
            <input 
              type="text" 
              name="mentality" 
              className={styles.input} 
              value={formData.mentality} 
              onChange={handleChange} 
              placeholder="Your answer..." 
            />
          </InputGroup>

          <div className={styles.checkboxGroup}>
            <input 
              type="checkbox" 
              name="agreement" 
              id="agreement"
              className={styles.checkbox} 
              checked={formData.agreement} 
              onChange={handleChange} 
            />
            <label htmlFor="agreement" className={styles.agreementText}>
              I understand this is <strong>NOT</strong> a get-rich-quick program. I am applying to join a serious business team and I am willing to do the work required.
              {errors.agreement && <div className={styles.errorMsg}>{errors.agreement}</div>}
            </label>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Submit Application'}
          </button>

        </form>
      </section>
    </div>
  );
}

function ListItem({ icon, text }) {
  return (
    <li className={styles.listItem}>
      <span className={`${styles.icon} ${icon === 'check' ? styles.check : styles.cross}`}>
        {icon === 'check' ? '✓' : '✕'}
      </span>
      <span>{text}</span>
    </li>
  );
}

function InputGroup({ label, children, error }) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      {children}
      {error && <span className={styles.errorMsg}>⚠ {error}</span>}
    </div>
  );
}
