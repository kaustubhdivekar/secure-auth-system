// src/pages/Auth/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import styles from './AuthPages.module.css';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    setServerMessage({ type: '', text: '' });
    try {
      const response = await authService.forgotPassword({ email: data.email });
      if (response.success) {
        toast.success(response.message || 'Password reset link sent if email exists.');
        setServerMessage({ type: 'success', text: response.message || 'Password reset link sent. Please check your email.' });
      } else {
        toast.error(response.message || 'Failed to send reset link.');
        setServerMessage({ type: 'error', text: response.message || 'Failed to send reset link.' });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      toast.error(errMsg);
      setServerMessage({ type: 'error', text: errMsg });
    }
  };

  return (
    <AuthLayout>
      <div className={styles.authFormContainerWithGradientBorder}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm} noValidate>
          <h2 className={styles.title}>Forgot Password</h2>
          <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>

          {serverMessage.text && (
            <p className={serverMessage.type === 'success' ? styles.serverSuccess : styles.serverError}>
              {serverMessage.text}
            </p>
          )}

          <InputField
            id="email"
            type="email"
            placeholder="Your Email Address"
            icon={<FaEnvelope />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
            })}
          />
          <Button type="submit" disabled={isSubmitting} className={styles.submitButtonFullWidth}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <p className={styles.authLinkMuted}>
            Remembered your password? <Link to="/login" className={styles.authLinkHighlight}>Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
export default ForgotPasswordPage;