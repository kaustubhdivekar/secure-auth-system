// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './HomePage.module.css';
import Button from '../components/common/Button/Button';

// You would ideally move these sections into their own components (e.g., HeroSection.jsx, FeaturesSection.jsx)
// For demonstration, we'll keep them inline for now.

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className={styles.homeContainer}>
      <header className={`${styles.heroSection} ${styles.section}`}>
        <h1 className={styles.heroTitle}>Welcome to TO-LET</h1>
        <p className={styles.heroSubtitle}>
          Your ultimate destination for finding and listing rental properties.
        </p>
        {isAuthenticated ? (
          <div className={styles.loggedInActions}>
            <p>Hello, {user?.username || user?.email}! What would you like to do today?</p>
            <Button onClick={() => window.location.href = '/dashboard'} className={styles.heroButton} variant="secondary">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className={styles.authActions}>
            <Link to="/login">
              <Button className={styles.heroButton} variant="secondary">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" className={styles.heroButton}>Sign Up</Button>
            </Link>
          </div>
        )}
      </header>

      <section className={`${styles.servicesSection} ${styles.section}`}> {/* NEW SECTION */}
        <h2>Our Services</h2>
        <div className={styles.servicesGrid}>
          {/* Service items - replace with actual content/components */}
          <div className={styles.serviceItem}>
            <h3>Service 1 Title</h3>
            <p>Short description of service 1.</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Service 2 Title</h3>
            <p>Short description of service 2.</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Service 3 Title</h3>
            <p>Short description of service 3.</p>
          </div>
          {/* Add more service items as needed */}
        </div>
      </section>

      <section className={`${styles.aboutUsSection} ${styles.section}`}> {/* NEW SECTION */}
        <h2>About Us</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h3>Who We Are</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className={styles.aboutImage}>
            {/* Placeholder for About Us image */}
            <img src="/path/to/about-image.jpg" alt="About Us" className={styles.aboutImg}/>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            {/* Placeholder for Mission image */}
            <img src="/path/to/mission-image.jpg" alt="Our Mission" className={styles.aboutImg}/>
          </div>
          <div className={styles.aboutText}>
            <h3>Our Mission</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
         <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h3>Our Vision</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className={styles.aboutImage}>
            {/* Placeholder for Vision image */}
            <img src="/path/to/vision-image.jpg" alt="Our Vision" className={styles.aboutImg}/>
          </div>
        </div>
      </section>

      <section className={`${styles.hiringPartnersSection} ${styles.section}`}> {/* NEW SECTION */}
        <h2>Our Hiring Partners</h2>
        <div className={styles.partnersGrid}>
          {/* Placeholder for partner logos */}
          <img src="/path/to/partner1-logo.png" alt="Partner 1" className={styles.partnerLogo}/>
          <img src="/path/to/partner2-logo.png" alt="Partner 2" className={styles.partnerLogo}/>
          <img src="/path/to/partner3-logo.png" alt="Partner 3" className={styles.partnerLogo}/>
          {/* Add more partner logos */}
        </div>
      </section>

      <section className={`${styles.topLocationsSection} ${styles.section}`}> {/* NEW SECTION */}
        <h2>Top Locations</h2>
        <div className={styles.locationsGrid}>
          {/* Placeholder for location images/cards */}
          <div className={styles.locationCard}>
            <img src="/path/to/location1.jpg" alt="Location 1" className={styles.locationImg}/>
            <h3>Location Name 1</h3>
          </div>
          <div className={styles.locationCard}>
            <img src="/path/to/location2.jpg" alt="Location 2" className={styles.locationImg}/>
            <h3>Location Name 2</h3>
          </div>
          {/* Add more location cards */}
        </div>
      </section>

      <section className={`${styles.partneredUniversitiesSection} ${styles.section}`}> {/* NEW SECTION */}
        <h2>Partnered Universities</h2>
        <div className={styles.universitiesGrid}>
          {/* Placeholder for university logos */}
          <img src="/path/to/uni1-logo.png" alt="University 1" className={styles.universityLogo}/>
          <img src="/path/to/uni2-logo.png" alt="University 2" className={styles.universityLogo}/>
          {/* Add more university logos */}
        </div>
      </section>

      {/* Your existing features and contact sections, moved down */}
      <section className={`${styles.featuresSection} ${styles.section}`}>
        <h2>Why Choose Us?</h2>
        <div className={styles.feature}>Feature 1: Easy Listings</div>
        <div className={styles.feature}>Feature 2: Verified Users</div>
        <div className={styles.feature}>Feature 3: Great Support</div>
      </section>

      <section className={`${styles.contactSection} ${styles.section}`}>
        <h2>Contact Us</h2>
        <p>We'd love to hear from you!</p>
        {/* Placeholder for the Contact Form component or content */}
        {/* If you have a separate ContactForm component, you can import and render it here */}
        <div className={styles.contactFormPlaceholder}>
          {/* For now, just a button, but you can integrate your ContactForm component here */}
          <Link to="/contact">
            <Button className={styles.heroButton} variant="secondary">Go to Contact Page</Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;