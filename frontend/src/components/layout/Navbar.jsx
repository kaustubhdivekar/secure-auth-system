import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Basic "TO-LET" logo as text, replace with an image if you have one
  const Logo = () => (
    <Link to="/" className={styles.logo}>
      TO-LET
    </Link>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Logo />
        <div className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            About
          </NavLink>
          <NavLink
            to="/property-listing"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Property Listing
          </NavLink>
          {isAuthenticated ? (
            <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutButton}`}>Logout</button>
          ) : (
            <NavLink to="/login" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
