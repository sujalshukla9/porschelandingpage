import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        PORSCHE
                        <span className="block-reveal">Beyond the Limits</span>
                    </h1>
                    <p className="hero-subtitle">
                        Where performance meets the future. Inspired by precision, engineered for perfection.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}>Explore Model</button>
                        <button className="btn-glass" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Get in Touch</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
