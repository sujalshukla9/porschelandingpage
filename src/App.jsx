import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';

import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
    useEffect(() => {
        // Entrance animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app-container">
            <Navbar />
            <Hero />
            <About />
            <Features />

            <Gallery />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
