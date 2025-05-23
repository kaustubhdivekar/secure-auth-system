// src/pages/Dashboard/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import { toast } from 'react-toastify';
import styles from './DashboardPage.module.css';
import { Link } from 'react-router-dom'; // For Admin link
// Make sure you have a Button component or remove this import if not used for navigation in this exact file
// import Button from '../../components/common/Button/Button';

const DashboardPage = () => {
  const { token, isLoading: isAuthContextLoading } = useAuth();
  const [profile, setProfile] = useState(null); // Start with null, fetch fresh data
  const [isProfileLoading, setIsProfileLoading] = useState(true); // Specific loading for this page's data

  useEffect(() => {
    const fetchDashboardProfile = async () => {
      // Only fetch if AuthContext is done loading AND a token exists
      if (!isAuthContextLoading && token) {
        setIsProfileLoading(true); // Indicate profile fetching has started
        try {
          const response = await authService.getCurrentUser(); // Hits /api/auth/me
          if (response.success && response.user) {
            setProfile(response.user);
          } else {
            toast.error(response.message || 'Could not load profile data.');
            setProfile(null); // Clear profile on failure
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Error fetching your profile.';
          toast.error(errorMessage);
          setProfile(null); // Clear profile on error
          // If it's an auth error (e.g. 401), AuthContext/apiService interceptor should handle logout/redirect
        } finally {
          setIsProfileLoading(false); // Indicate profile fetching is complete
        }
      } else if (!isAuthContextLoading && !token) {
        // AuthContext is done, but no token means user is not authenticated.
        // ProtectedRoute should handle redirection.
        setIsProfileLoading(false); // Ensure loading is stopped
        setProfile(null);
      }
      // If isAuthContextLoading is true, do nothing yet, wait for it to resolve.
    };

    fetchDashboardProfile();

    // Dependencies:
    // isAuthContextLoading: Run when AuthContext finishes its initial load/check.
    // token: Run if the token changes (e.g., after login or logout).
  }, [isAuthContextLoading, token]); // *** CRITICAL: Corrected dependency array ***

  // Display loading indicators based on the sequence of operations
  if (isAuthContextLoading) {
    return <div className={styles.loading}>Initializing session...</div>;
  }

  if (isProfileLoading) {
    // This will show after AuthContext is done, while dashboard fetches its data
    return <div className={styles.loading}>Loading Dashboard Data...</div>;
  }

  // If all loading is complete, but there's no profile (e.g., fetch failed, or user is logged out)
  if (!profile) {
    return (
      <div className={`${styles.errorContainer} ${styles.dashboardContainer}`}> {/* Added dashboardContainer for padding */}
        <p className={styles.errorMessage}>Could not load your profile information.</p>
        <p>This might be due to a session timeout or a network issue.</p>
        <Link to="/login">
          {/* Using a simple styled button; replace with your Button component if preferred */}
          <button className={styles.actionButton}>Return to Login</button>
        </Link>
      </div>
    );
  }

  // If profile data is available
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.profileCard}>
        <h2 className={styles.greeting}>Welcome, {profile.username || profile.email}!</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Account Verified:</strong> {profile.isVerified ? 'Yes' : 'No'}</p>
        {profile.firstName && <p><strong>Name:</strong> {profile.firstName} {profile.lastName || ''}</p>}
        <p><strong>Joined:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>

      {profile.role === 'Admin' && (
        <div className={styles.adminSection}>
          <h3>Admin Controls</h3>
          <p>Special administrative actions would go here.</p>
          {/* Example Link using Button component if available and imported */}
          {/* <Link to="/admin"><Button variant="secondary">Admin Panel</Button></Link> */}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;