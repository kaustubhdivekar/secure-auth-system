// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path
import styles from './HomePage.module.css';
import Button from '../components/common/Button/Button';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className={styles.homeContainer}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to TO-LET</h1>
        <p className={styles.heroSubtitle}>
          Your ultimate destination for finding and listing rental properties.
        </p>
        {isAuthenticated ? (
          <div className={styles.loggedInActions}>
            <p>Hello, {user?.username || user?.email}! What would you like to do today?</p>
            <Button onClick={() => window.location.href = '/dashboard'} className={styles.heroButton}>
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className={styles.authActions}>
            <Link to="/login">
              <Button className={styles.heroButton}>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" className={styles.heroButton}>Sign Up</Button>
            </Link>
          </div>
        )}
      </header>

      <section className={styles.featuresSection}>
        <h2>Why Choose Us?</h2>
        {/* Add feature cards or content here, styled consistently */}
        <div className={styles.feature}>Feature 1: Easy Listings</div>
        <div className={styles.feature}>Feature 2: Verified Users</div>
        <div className={styles.feature}>Feature 3: Great Support</div>
      </section>

      <section className={styles.featuresSection}>
        <h2>Contact Us</h2>
        <div className={styles.authActions}>
            <Link to="/contact">
              <Button className={styles.heroButton}>Contact Us</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};
export default HomePage;