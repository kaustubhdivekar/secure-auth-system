import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from'./BlogPages.module.css';

const BlogListingPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('latest'); // 'latest' or 'trending'
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async (page, sortOrder) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`, {
                params: { page, limit: 6, sortBy: sortOrder }
            });
            setBlogs(response.data.blogs);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            toast.error('Failed to load blogs.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(currentPage, sortBy);
    }, [currentPage, sortBy]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
        setCurrentPage(1); // Reset to first page when changing sort
    };

    const handleLike = async (blogId) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs/${blogId}/like`);
            toast.success('Blog liked!');
            // Re-fetch blogs to update like count, or update state directly
            setBlogs(blogs.map(blog =>
                blog._id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
            ));
        } catch (error) {
            console.error('Error liking blog:', error);
            toast.error('Failed to like blog.');
        }
    };

    return (
        <div className={styles['blog-listing-container']}>
            <h1>Our Blog</h1>

            <div className={styles['sort-buttons']}>
                <button
                    className={`${styles.button} ${sortBy === 'latest' ? styles.active : ''}`}
                    onClick={() => handleSortChange('latest')}
                >
                    Latest
                </button>
                <button
                    className={`${styles.button} ${sortBy === 'trending' ? styles.active : ''}`}
                    onClick={() => handleSortChange('trending')}
                >
                    Trending
                </button>
            </div>

            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                <>
                    <div className={styles['blog-grid']}>
                        {blogs.map((blog) => (
                            <div key={blog._id} className={styles['blog-card']}>
                                {blog.imageUrl && (
                                    <img src={blog.imageUrl} alt={blog.title} className={styles['blog-image']} />
                                )}
                                <div className={styles['blog-card-content']}>
                                    <h2>{blog.title}</h2>
                                    <p className={styles['blog-intro']}>{blog.intro}</p>
                                    <p className={styles['blog-meta']}>
                                        By {blog.name} ({blog.role}) on {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className={styles['blog-stats']}>
                                        <span>❤️ {blog.likes}</span>
                                        <span>👁️ {blog.views}</span>
                                    </div>
                                    <div className={styles['blog-actions']}>
                                        <Link to={`/blogs/${blog._id}`} className={styles['read-more-button']}>Read More</Link>
                                        <button onClick={() => handleLike(blog._id)} className={styles['like-button']}>Like</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogListingPage;