// frontend/src/pages/PropertyDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PropertyDetailsPage.module.css';
import ImageCarousel from '../../components/common/ImageCarousel/ImageCarousel'; // Import the image carousel component

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}/api/properties/${id}`); // Use the full API URL
                setProperty(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) { // Only fetch if ID is available
            fetchProperty();
        } else {
            setError("No property ID provided.");
            setLoading(false);
        }
    }, [id]);

    const handleBackClick = () => {
        navigate('/properties'); // Navigate back to the /properties route (your listing page)
    };

    if (loading) return <div className={styles.loading}>Loading property details...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!property) return <div className={styles.notFound}>Property not found.</div>;

    return (
        <div className={styles.propertyDetailsPage}>
            <div className={styles.detailsContainer}>
                {/* Use 'bedrooms' and 'propertyType' from backend data */}
                <h1 className={styles.title}>{property.bhk || 'N/A'} BHK {property.spaceType || 'N/A'} in {property.locality || 'N/A'}</h1>
                
                {/* Integrate the ImageCarousel component here */}
                <ImageCarousel images={property.photos} />

                {/* Details page content (rent, address, etc.) */}    
                <div className={styles.overview}>
                    {/* Use 'price' for rent */}
                    <p className={styles.rent}>Rent: ₹{property.rent || 'N/A'} {property.maintenance > 0 ? `+ ₹${property.maintenance} (Maintenance)` : ''} per month</p>
                    {/* Access address components correctly */}
                    <p className={styles.address}>Address: <strong>{property.address || 'N/A'}</strong></p>
                    <p>Property Type: <strong>{property.spaceType || 'N/A'}</strong></p>
                    {/* Assuming you have a 'type' field in your data for furnishing */}
                    <p>Furnishing: <strong>{property.type || 'N/A'}</strong></p>
                    <p>Bedrooms: <strong>{property.bhk || 'N/A'}</strong></p>
                    <p>Bathrooms: <strong>{property.bathrooms || 'N/A'}</strong></p>
                    <p>Floor: <strong>{property.floor || 'N/A'}</strong></p>
                    <p>Preference: <strong>{property.preference || 'N/A'} {property.bachelorsAllowed && property.bachelorsAllowed !== 'Any' ? `(${property.bachelorsAllowed} Bachelors Allowed)` : ''}</strong></p>
                    <p>Pets Allowed: <strong>{property.petsAllowed ? 'Yes' : 'No'}</strong></p>
                    <p>Car Parking: <strong>{property.carParking ? 'Yes' : 'No'}</strong></p>
                    <p>Washroom Type: <strong>{property.washroomType || 'N/A'}</strong></p>
                    <p>Cooling Facility: <strong>{property.coolingFacility || 'N/A'}</strong></p>
                    <p>Area: <strong>{property.squareFeetArea || 'N/A'}</strong> sq. ft.</p>
                    {property.nearestLandmark && <p>Nearest Landmark: <strong>{property.nearestLandmark}</strong></p>}
                </div>

                {/* Use 'description' from backend data */}
                {property.aboutProperty && (
                    <div className={styles.sectionBlock}>
                        <h2>About the Property</h2>
                        <p>{property.aboutProperty}</p>
                    </div>
                )}

                {property.appliances && property.appliances.length > 0 && (
                    <div className={styles.sectionBlock}>
                        <h2>Appliances</h2>
                        <ul className={styles.list}>
                            {property.appliances.map((appliance, index) => (
                                <li key={index}>{appliance}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {property.amenities && property.amenities.length > 0 && (
                    <div className={styles.sectionBlock}>
                        <h2>Amenities</h2>
                        <ul className={styles.list}>
                            {property.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Owner details using firstName, lastName, ownerContactNumber, ownerAlternateContactNumber */}
                <div className={styles.ownerInfo}>
                    <h2>Owner Details</h2>
                    <p>Name: <strong>{property.firstName || 'N/A'} {property.lastName || 'N/A'}</strong></p>
                    <p>Contact: <strong>{property.ownerContactNumber || 'N/A'}</strong></p>
                    {property.ownerAlternateContactNumber && <p>Alternate Contact: <strong>{property.ownerAlternateContactNumber}</strong></p>}
                </div>

                {/* Google Map Location - Keep as placeholder for now */}
                {property.googleMapLocation && property.googleMapLocation.latitude && property.googleMapLocation.longitude && (
                    <div className={styles.sectionBlock}>
                        <h2>Location on Map</h2>
                        <div className={styles.mapContainer}>
                            <p>Map Placeholder for {property.googleMapLocation.latitude}, {property.googleMapLocation.longitude}</p>
                        </div>
                    </div>
                )}

                {/* Back to Listings Button */}
                <div className={styles.backButtonContainer}>
                    <button onClick={handleBackClick} className={styles.backButton}>
                        &larr; Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PropertyDetailsPage;