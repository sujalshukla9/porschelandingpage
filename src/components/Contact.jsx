import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="contact" id="contact">


            <div className="contact-card glass-card animate-on-scroll">
                <h2 className="title-center" style={{ marginBottom: '10px' }}>Get In <span className="highlight-text">Touch</span></h2>
                <p className="contact-subtitle">Have a project, collaboration, or inquiry? Reach out below.</p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="user@example.com"
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your vision..."
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
                            Send Message
                        </button>
                    </form>
                ) : (
                    <div className="success-message">
                        <h3>Transmission Received</h3>
                        <p>Thanks for reaching out — we’ll reply shortly.</p>
                        <button className="btn-glass" onClick={() => setSubmitted(false)}>Send Another</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
