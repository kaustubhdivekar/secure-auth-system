import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './BlogListingPage.css';

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
        <div className="blog-listing-container">
            <h1>Our Blog</h1>

            <div className="sort-buttons">
                <button
                    className={sortBy === 'latest' ? 'active' : ''}
                    onClick={() => handleSortChange('latest')}
                >
                    Latest
                </button>
                <button
                    className={sortBy === 'trending' ? 'active' : ''}
                    onClick={() => handleSortChange('trending')}
                >
                    Trending
                </button>
            </div>

            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                <>
                    <div className="blog-grid">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="blog-card">
                                {blog.imageUrl && (
                                    <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                                )}
                                <div className="blog-card-content">
                                    <h2>{blog.title}</h2>
                                    <p className="blog-intro">{blog.intro}</p>
                                    <p className="blog-meta">
                                        By {blog.name} ({blog.role}) on {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="blog-stats">
                                        <span>❤️ {blog.likes}</span>
                                        <span>👁️ {blog.views}</span>
                                    </div>
                                    <div className="blog-actions">
                                        <Link to={`/blogs/${blog._id}`} className="read-more-button">Read More</Link>
                                        <button onClick={() => handleLike(blog._id)} className="like-button">Like</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={page === currentPage ? 'active' : ''}
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