// frontend/src/pages/ContactUs/ContactUsPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import contactService from '../../services/contactService'; // Adjust path if necessary

// Import AuthLayout for centering the page content
import AuthLayout from '../../components/layout/AuthLayout';
// Import InputField for consistent input styling
import InputField from '../../components/common/InputField/InputField';

// Import shared AuthPages styles for button and container classes
import authStyles from '../Auth/AuthPages.module.css'; // Renamed to avoid conflict with ContactUsPage.module.css

// Import ContactUsPage's specific styles
import contactStyles from './ContactUsPage.module.css'; // <--- NEW IMPORT

// Icons for input fields
import { FaUserAlt, FaEnvelope, FaPhone, FaTag, FaEdit } from 'react-icons/fa'; // Added icons for contact form

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
        <AuthLayout> {/* Wrap the content with AuthLayout for centering and consistent background */}
            <div className={authStyles.authFormContainerWithGradientBorder}> {/* Reusing the outer border container */}
                <form onSubmit={handleSubmit(onSubmit)} className={authStyles.authForm}> {/* Reusing the inner form styling */}
                    <h2 className={authStyles.title}>Contact Us</h2> {/* Reusing the title style */}
                    <p className={contactStyles.subheading}>We'd love to hear from you!</p> {/* Using contactStyles for subheading */}

                    {/* Name Input */}
                    <InputField
                        id="name"
                        label="Name"
                        placeholder="Your Name"
                        icon={<FaUserAlt />}
                        error={errors.name?.message}
                        {...register('name', { required: 'Name is required' })}
                    />

                    {/* Email Input */}
                    <InputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Your Email Address"
                        icon={<FaEnvelope />}
                        error={errors.email?.message}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Invalid email address'
                            }
                        })}
                    />

                    {/* Phone Number Input */}
                    <InputField
                        id="phone"
                        type="text"
                        label="Phone Number (Optional)"
                        placeholder="Your Phone Number"
                        icon={<FaPhone />}
                        error={errors.phone?.message}
                        {...register('phone')}
                    />

                    {/* Topic Select */}
                    {/* Using a regular select and applying common styling classes from AuthPages.module.css. */}
                    <div className={authStyles.inputGroup}> {/* Reusing inputGroup for icon positioning */}
                        <FaTag className={authStyles.inputIcon} /> {/* Icon for select */}
                        <select
                            id="topic"
                            className={`${authStyles.selectField} ${errors.topic ? authStyles.inputError : ''}`} // Reusing selectField and inputError classes
                            {...register('topic', { required: 'Please select a topic' })}
                        >
                            <option value="">Select a topic</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.topic && <p className={authStyles.errorMessage}>{errors.topic.message}</p>}
                    </div>

                    {/* Query/Message Textarea */}
                    {/* Using regular textarea with common styling classes from AuthPages.module.css. */}
                    <div className={authStyles.inputGroup}> {/* Reusing inputGroup */}
                        <FaEdit className={authStyles.inputIcon} style={{ top: '20px', transform: 'translateY(0)' }}/> {/* Adjust icon position for textarea */}
                        <textarea
                            id="message"
                            rows="5"
                            placeholder="Your Message"
                            className={`${authStyles.inputField} ${authStyles.inputWithIcon} ${errors.message ? authStyles.inputError : ''}`} // Use inputField classes
                            {...register('message', {
                                required: 'Message is required',
                                maxLength: {
                                    value: 500,
                                    message: 'Message cannot exceed 500 characters'
                                }
                            })}
                        ></textarea>
                        {errors.message && <p className={authStyles.errorMessage}>{errors.message.message}</p>}
                    </div>

                    {/* Send Message Button */}
                    <button type="submit" className={authStyles.submitButtonFullWidth}> {/* Use the consistent button style */}
                        Send Message
                    </button>

                    {/* Privacy Statement */}
                    <p className={contactStyles.privacyStatement}> {/* Using contactStyles for privacy statement */}
                        We respect your privacy and will never share your data with third parties without your consent.
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ContactUsPage;