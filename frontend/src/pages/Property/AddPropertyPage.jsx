// frontend/src/pages/AddPropertyPage.jsx
import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AddPropertyForm from '../../components/properties/AddPropertyForm'; // Create this component
import styles from './AddPropertyPage.module.css'; // Create this CSS module

const AddPropertyPage = () => {
    const { isAuthenticated, loading: authLoading } = useAuth(); // Assuming useAuth provides loading state
    const navigate = useNavigate();

    // Authentication check
    if (authLoading) {
        return <div className={styles.loading}>Loading authentication status...</div>;
    }

    if (!isAuthenticated) {
        // Display message and redirect to login if not logged in
        return (
            <div className={styles.authRequired}>
                <p>You must be logged in to add a property.</p>
                <button onClick={() => navigate('/login')} className={styles.loginButton}>Go to Login</button>
            </div>
        );
    }

    return (
        <div className={styles.addPropertyPage}>
            <h1 className="main-heading">Add New Property</h1>
            <AddPropertyForm />
        </div>
    );
};

export default AddPropertyPage;