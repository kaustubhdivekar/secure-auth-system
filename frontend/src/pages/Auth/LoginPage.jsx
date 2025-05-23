import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AuthPages.module.css'; // Shared styles
// Assuming AuthLayout is optional or you center manually
// import AuthLayout from '../../components/layout/AuthLayout';

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
        <h2 className={styles.title}>Login</h2>
        {serverError && <p className={styles.serverError}>{serverError}</p>}

        <div className={styles.inputGroup}>
          <FaUserAlt className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Username or Email"
            className={`${styles.inputField} ${errors.emailOrUsername ? styles.inputError : ''}`}
            {...register('emailOrUsername', { required: 'Username or Email is required' })}
          />
        </div>
        {errors.emailOrUsername && (
          <p className={styles.errorMessage}>{errors.emailOrUsername.message}</p>
        )}

        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <input
            type="password"
            placeholder="Password"
            className={`${styles.inputField} ${errors.password ? styles.inputError : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
        </div>
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'LOGIN'}
        </button>

        <div className={styles.linksContainer}>
          <Link to="/forgot-password" className={styles.authLink}>
            Forgot Password ?
          </Link>{' '}
          {/* Added space for UI match */}
          <Link to="/register" className={styles.authLink}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );

  // If using AuthLayout: return <AuthLayout>{pageContent}</AuthLayout>;
  // Centering manually:
  return <div className={styles.fullPageCentered}>{pageContent}</div>;
};

export default LoginPage;
