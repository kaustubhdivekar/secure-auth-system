// frontend/src/pages/ContactUsPage.jsx (Example structure)
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import contactService from '../services/contactService'; // Create this service

import styles from './ContactUsPage.module.css'; // Create this CSS module

const ContactUsPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await contactService.submitContactForm(data);
            toast.success('Your message has been sent successfully!');
            reset(); // Clear the form
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Contact Us</h1>
            <p className={styles.subheading}>We'd love to hear from you!</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Invalid email address'
                        }
                    })} />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input type="text" id="phone" {...register('phone')} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="topic">Topic</label>
                    <select id="topic" {...register('topic', { required: 'Please select a topic' })}>
                        <option value="">Select a topic</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.topic && <span className={styles.error}>{errors.topic.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="message">Query/Message</label>
                    <textarea id="message" rows="5" {...register('message', {
                        required: 'Message is required',
                        maxLength: {
                            value: 500,
                            message: 'Message cannot exceed 500 characters'
                        }
                    })}></textarea>
                    {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                </div>

                {/* Optional: CAPTCHA integration here */}

                <button type="submit" className={styles.submitButton}>Send Message</button>
            </form>

            <p className={styles.privacyStatement}>
                Your information will be collected, used, and stored according to our Privacy Policy.
                We respect your privacy and will not share your data with third parties without your consent.
            </p>
        </div>
    );
};

export default ContactUsPage;