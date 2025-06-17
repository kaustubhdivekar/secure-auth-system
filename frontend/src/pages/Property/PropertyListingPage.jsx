// frontend/src/pages/PropertyListingPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './PropertyListingPage.module.css'; // Create this CSS module
import PropertyCard from '../../components/properties/PropertyCard'; // Create this component
import Pagination from '../../components/common/Pagination/Pagination'; // Create this component
import SortFilterBar from '../../components/properties/SortFilterBar'; // Create this component
import axios from 'axios';

const PropertyListingPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('dateUploaded'); // Default sort
    const [sortOrder, setSortOrder] = useState('desc'); // Default order

    const propertiesPerPage = 6; // As per requirement

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}/api/properties`, {
                    params: {
                        page: currentPage,
                        limit: propertiesPerPage,
                        sortBy,
                        sortOrder
                    }
                });

                // Ensure data.properties is an array before setting state
                setProperties(Array.isArray(data.properties) ? data.properties : []);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError('Failed to fetch properties. Please try again later.');
                console.error("Error fetching properties:", err); // More specific console log
                // Ensure properties is set to an empty array on error to prevent further crashes
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [currentPage, sortBy, sortOrder]); // Re-fetch when page, sort, or order changes

    const handleSortChange = (newSortBy, newSortOrder) => {
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
        setCurrentPage(1); // Reset to first page on sort change
    };
    

    if (loading) return <div className={styles.loading}>Loading properties...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.propertyListingPage}>
            <h1 className="main-heading">Available Properties</h1>
            <p className="subheading">Browse through our latest listings.</p>
            <SortFilterBar
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
            />
            {properties && properties.length === 0 ?  (
                <p className={styles.noProperties}>No properties found matching your criteria.</p>
            ) : (
                <div className={styles.propertiesGrid}>
                     {/* Added a safe check: properties && before mapping */}
                    {properties && properties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default PropertyListingPage;