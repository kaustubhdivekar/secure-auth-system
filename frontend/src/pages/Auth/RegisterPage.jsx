import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

// Import shared AuthPages styles for button and container classes
import styles from './AuthPages.module.css';
// Import AuthLayout for centering the page content
import AuthLayout from '../../components/layout/AuthLayout';
// Import InputField for consistent input styling
import InputField from '../../components/common/InputField/InputField';
// Import Button for consistent input styling
import Button from '../../components/common/Button/Button';
import PasswordStrengthIndicator from '../../components/ui/PasswordStrengthIndicator/PasswordStrengthIndicator';
import { FaUserAlt, FaEnvelope, FaLock, FaBriefcase } from 'react-icons/fa';

const VALID_ROLES = ['Buyer', 'Tenant', 'Owner', 'User', 'Admin', 'Content Creator'];

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { role: 'User' },
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const passwordValue = watch('password', ''); // Watch password field for confirmation validation

  const onSubmit = async (data) => {
    setServerError(null);
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match.');
      setServerError('Passwords do not match.');
      return;
    }
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        firstName: data.firstName, 
        lastName: data.lastName,   
      };
      const response = await authService.register(payload);
      if (response.success) {
        toast.success(response.message || 'Registration successful! Please check your email to verify.');
        navigate('/login');
      } else {
        setServerError(response.message || 'Registration failed.');
        toast.error(response.message || 'Registration failed.');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || 'An unexpected registration error occurred.';
      setServerError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.authFormContainerWithGradientBorder}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm} noValidate>
          <h2 className="main-heading">Register</h2>
          <p className="subheading">Create your account</p>
          {serverError && <p className={styles.serverError}>{serverError}</p>}

          <InputField
            id="username"
            label="Username"
            placeholder="Username"
            icon={<FaUserAlt />}
            error={errors.username?.message}
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
            })}
          />
          {/* First Name - Made Mandatory */}
          <InputField
            id="firstName"
            label="First Name"
            placeholder="First Name"
            icon={<FaUserAlt />} /* Using FaUserAlt, could use FaBuilding for a generic feel */
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First Name is required',
              minLength: { value: 2, message: 'First Name must be at least 2 characters' },
            })}
          />
          {/* Last Name - Made Mandatory */}
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            icon={<FaUserAlt />} /* Using FaUserAlt, could use FaBuilding for a generic feel */
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last Name is required',
              minLength: { value: 2, message: 'Last Name must be at least 2 characters' },
            })}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Email Address"
            icon={<FaEnvelope />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
            })}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            icon={<FaLock />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
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
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            icon={<FaLock />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === passwordValue || 'Passwords do not match',
            })}
          />
          <div className={styles.inputGroup}>
            <FaBriefcase className={styles.inputIcon} /> {/* Icon for Role Select */}
            <select
              id="role"
              label="Role"
              className={styles.selectField} // Apply selectField specific styling
              {...register('role', { required: 'Role is required' })}
            >
              <option value="" disabled>Select Role</option> {/* Added a disabled placeholder option */}
              {VALID_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.role && <p className={styles.errorMessage}>{errors.role.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} variant="secondary" className={styles.submitButtonFullWidth}>
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </Button>
          <p className={styles.authLinkMuted}>
            Already have an account? <Link to="/login" className={styles.authLinkHighlight}>Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
export default RegisterPage;