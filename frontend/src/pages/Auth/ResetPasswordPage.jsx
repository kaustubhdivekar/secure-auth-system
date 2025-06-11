// src/pages/Auth/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import styles from './AuthPages.module.css';
import AuthLayout from '../../components/layout/AuthLayout';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import PasswordStrengthIndicator from '../../components/ui/PasswordStrengthIndicator/PasswordStrengthIndicator';
import { FaLock } from 'react-icons/fa';

const ResetPasswordPage = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { token } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const passwordValue = watch('password', '');

  const onSubmit = async (data) => {
    setServerError(null);
    if (!token) {
      toast.error('Invalid or missing reset token.');
      setServerError('Invalid or missing reset token.');
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match.');
      setServerError('Passwords do not match.');
      return;
    }
    try {
      const response = await authService.resetPassword(token, { newPassword: data.password, confirmNewPassword: data.confirmPassword });
      if (response.success) {
        toast.success(response.message || 'Password reset successfully!');
        navigate('/login');
      } else {
        setServerError(response.message || 'Failed to reset password.');
        toast.error(response.message || 'Failed to reset password. Link may be invalid or expired.');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      setServerError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.authFormContainerWithGradientBorder}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm} noValidate>
          <h2 className="main-heading">Reset Password</h2>
          {serverError && <p className={styles.serverError}>{serverError}</p>}

          <InputField
            id="password"
            type="password"
            placeholder="New Password"
            icon={<FaLock />}
            error={errors.password?.message}
            {...register('password', {
              required: 'New password is required',
              minLength: { value: 8, message: 'Password must be at least 8 chars' },
               pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]).*$/,
                message: 'Needs upper, lower, num, special char.',
              },
            })}
          />
          {passwordValue && <PasswordStrengthIndicator password={passwordValue} />}
          <InputField
            id="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            icon={<FaLock />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: (value) => value === passwordValue || 'Passwords do not match',
            })}
          />
          <Button type="submit" disabled={isSubmitting} variant="secondary" className={styles.submitButtonFullWidth}>
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
           <p className={styles.authLinkMuted}>
            <Link to="/login" className={styles.authLinkHighlight}>Back to Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
export default ResetPasswordPage;