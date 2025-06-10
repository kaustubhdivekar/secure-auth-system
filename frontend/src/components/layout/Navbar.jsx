import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  // --- ADD THIS CONSOLE LOG ---
  useEffect(() => {
    console.log('Navbar - isAuthenticated:', isAuthenticated);
    console.log('Navbar - user:', user);
    if (user) {
      console.log('Navbar - user.role:', user.role);
      console.log('Navbar - Type of user.role:', typeof user.role);
      console.log('Navbar - Is user.role === "contentCreator"?', user.role === 'contentCreator');
      console.log('Navbar - Is user.role === "Content Creator"?', user.role === 'Content Creator'); // Check for common variations
    }
  }, [isAuthenticated, user]);
  // --- END CONSOLE LOG ---

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Basic "TO-LET" logo as text, replace with an image if you have one
  const Logo = () => (
    <Link to="/" className={styles.logo}>
      TO-LET GLOBE
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
            to="/blogs"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Blog
          </NavLink>
          {/* Only show 'Add Blog' if logged in as a content creator */}
          {isAuthenticated && user && user.role === 'Content Creator' && (
          <NavLink
            to="/blogs/create"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Add Blog
          </NavLink>)}
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
            <NavLink
              to="/login" 
              className={({isActive}) => 
                isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
          >
            Login
          </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
