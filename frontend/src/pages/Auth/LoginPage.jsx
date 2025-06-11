// frontend/src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';


// Import shared AuthPages styles for button and container classes
import styles from './AuthPages.module.css'; // Shared styles
// Import AuthLayout for centering the page content
import AuthLayout from '../../components/layout/AuthLayout';
// Import InputField for consistent input styling
import InputField from '../../components/common/InputField/InputField';

// Icons from react-icons
import { FaUserAlt, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const response = await authService.login({
        email: data.emailOrUsername,
        password: data.password,
      });
      if (response.success && response.user && response.token) {
        contextLogin(response.user, response.token);
        toast.success('Login successful!');
        navigate(from, { replace: true });
      } else {
        setServerError(response.message || 'Login failed.');
        toast.error(response.message || 'Login failed.');
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || 'An unexpected error occurred.';
      setServerError(errMsg);
      toast.error(errMsg);
    }
  };

  const pageContent = (
    <div className={styles.authFormContainerWithGradientBorder}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        <h2 className="main-heading">Login</h2> 
        <p className="subheading">Welcome back!</p>
        {serverError && <p className={styles.serverError}>{serverError}</p>}

        <div className={styles.inputGroup}>
          <FaUserAlt className={styles.inputIcon} />
          <InputField
            id="email"
            type="email"
            label="Username or Email"
            placeholder="Enter your username or email"
            className={`${styles.inputField} ${errors.emailOrUsername ? styles.inputError : ''}`}
            {...register('emailOrUsername', { required: 'Username or Email is required' })}
          />
        </div>
        {errors.emailOrUsername && (
          <p className={styles.errorMessage}>{errors.emailOrUsername.message}</p>
        )}

        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            className={`${styles.inputField} ${errors.password ? styles.inputError : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

        <button type="submit" className={styles.submitButtonFullWidth} disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'LOGIN'}
        </button>

        <div className={styles.linksContainer}>
          <Link to="/forgot-password" className={styles.authLinkHighlight}>
            Forgot Password ?
          </Link>
          <Link to="/register" className={styles.authLinkHighlight}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );

  return <AuthLayout>{pageContent}</AuthLayout>;
};

export default LoginPage;
