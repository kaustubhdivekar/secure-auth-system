// frontend/src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

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

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false); // Close menu on logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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

        {/* Hamburger/Close Icon */}
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <div className={menuOpen ? `${styles.hamburger} ${styles.open}` : styles.hamburger}></div>
          <div className={menuOpen ? `${styles.hamburger} ${styles.open}` : styles.hamburger}></div>
          <div className={menuOpen ? `${styles.hamburger} ${styles.open}` : styles.hamburger}></div>
        </div>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {/* <div className={styles.navLinks}> */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu} // Close menu on link click
          >
            Home
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
          >
            Service
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
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
            onClick={closeMenu}
          >
            Add Blog
          </NavLink>)}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
          >
            Property Listing
          </NavLink>
          {/* Only show 'Add Property' if logged in as a Owner */}
          {isAuthenticated && user && user.role === 'Owner' && (
          <NavLink
            to="/add-property"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
          >
            Add Property
          </NavLink>)}
          {isAuthenticated ? (
            <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutButton}`}>Logout</button>
          ) : (
            <NavLink
              to="/login" 
              className={({isActive}) => 
                isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
            }
            onClick={closeMenu}
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
