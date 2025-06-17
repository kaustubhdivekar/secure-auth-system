// frontend/src/components/properties/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PropertyCard.module.css'; // Create this CSS module

const PropertyCard = ({ property }) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

    // Determine the image source based on whether it's a Cloudinary URL or a local path
    const imageUrl = property.photos && property.photos.length > 0
    ? property.photos[0].startsWith('http') // Check if it's an absolute URL (Cloudinary)
      ? property.photos[0] // Use the Cloudinary URL directly
      : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}${property.photos[0]}` // Prepend backend URL for local paths
    : '/fallback-image.jpg'; // Provide a fallback image path (e.g., from public folder)

    // Use 'price' from dummy data, fallback to 'rent' from schema if applicable, or 'N/A'
    const displayRent = property.rent !== undefined ? property.rent : (property.rent !== undefined ? property.rent : 'N/A');

    // Use 'bedrooms' from dummy data, fallback to 'bhk' from schema if applicable, or 'N/A'
    const displayBhk = property.bhk !== undefined ? property.bhk : (property.bhk !== undefined ? property.bhk : 'N/A');

    // Combine locality and city from the address object
    const displayLocation = property.locality || property.address || 'N/A'; // Prioritize locality, then address

    // Determine furnishing type. Use 'type' from schema/dummy data if available.
    const displayFurnishingType = property.type || 'N/A';

    return (
        <Link to={`/properties/${property._id}`} className={styles.propertyCard}>
            <div className={styles.imageContainer}>
                <img 
                    src={imageUrl} 
                    alt={`${property.bhk} BHK ${property.spaceType} in ${property.locality || 'Property'} image`} 
                    className={styles.propertyImage} 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/300x200/FF0000/FFFFFF?text=Error+Loading+Image'; // Fallback for broken image
                    }}
                    />
                {/* Add Rented Out badge if property.status implies it's rented */}
                {/* {property.status === 'Rented Out' && <span className={styles.rentedOutBadge}>Rented Out</span>} */}
            </div>
            <div className={styles.info}>
                <h3>{displayBhk} BHK {property.spaceType || 'Property'} On Rent</h3>
                <p className={styles.location}>{displayLocation}</p>
                <p className={styles.rent}>₹ {displayRent} / month</p>
                <div className={styles.details}>
                    <span>{displayFurnishingType}</span>
                    <span>{displayBhk} BHK</span>
                    {/* You can add more details here if available in your property object, e.g.: */}
                    {/* <span>{property.bathrooms} Bath</span> */}
                    {/* <span>{property.area} sqft</span> */}
                </div>
            </div>
            <button className={styles.showMoreButton}>SHOW MORE</button>
        </Link>
    );
};

export default PropertyCard;