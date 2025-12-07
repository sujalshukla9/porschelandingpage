import React from 'react';
import './About.css';
import aboutImg from '../assets/PORSCHE.jpg';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="about-container">
                <div className="about-col visual animate-on-scroll">
                    <div className="image-card glass-card">
                        <img src={aboutImg} alt="Porsche Detail" className="about-image" />
                    </div>
                </div>
                <div className="about-col content animate-on-scroll">
                    <h2>Designed for Performance.<br /><span className="highlight-text">Built for Space.</span></h2>
                    <p className="about-desc">
                        The new Porsche transcends traditional engineering. With aerodynamic efficiency sculpted for zero-gravity environments and propulsion systems inspired by advanced spacecraft technology, this is not just a car. It's an Odyssey.
                    </p>
                    <p className="about-desc">
                        Materials sourced from interstellar aesthetics meet the heritage of Stuttgart. Carbon-titanium weaves, holographic dashboards, and a silence that roars. Experience the future of automotive luxury.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
