import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import bgMusic from '../assets/background-music.m4a';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [isMuted, setIsMuted] = useState(false); // Default unmuted
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const audioRef = useRef(null);
    const lastScrollY = React.useRef(0);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.4;
                // Try playing. If it fails, we just catch it.
                // We do NOT set isMuted(true) because the user wants it to act unmuted.
                audioRef.current.play().catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            }
        };

        // Attempt immediate play on mount
        playAudio();

        // Also add a one-time global click listener to force play on first interaction
        // This handles cases where browser strictly blocks 'unsolicited' audio
        const handleOneTimeInteraction = () => {
            playAudio();
            document.removeEventListener('click', handleOneTimeInteraction);
        };

        document.addEventListener('click', handleOneTimeInteraction);
        return () => document.removeEventListener('click', handleOneTimeInteraction);
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            // If it wasn't playing (due to autoplay block), try playing again on interaction
            if (audioRef.current.paused) {
                audioRef.current.play();
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled styling should apply
            if (currentScrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Determine visibility (hide on down, show on up)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!visible ? 'hidden' : ''}`}>
            <div className="logo">PORSCHE</div>
            {/* Desktop Links */}
            <ul className="nav-links desktop-links">
                <li><a href="#about">About</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#contact" className="contact-link">Get Involved</a></li>
                <li>
                    <button onClick={toggleMute} className="mute-btn" data-hover="Sound">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <audio ref={audioRef} src={bgMusic} loop muted={isMuted} />
                </li>
            </ul>

            {/* Mobile Hamburger & Mute */}
            <div className="mobile-controls">
                <button onClick={toggleMute} className="mute-btn mobile-mute">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {/* Mobile Menu Overlay with Framer Motion */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="mobile-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Centering Container */}
                        <div className="mobile-menu-container">
                            <motion.div
                                className="mobile-menu-card"
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="mobile-card-header">
                                    <span className="logo" style={{ fontSize: '1.2rem' }}>PORSCHE</span>
                                    <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                                        <X size={24} />
                                    </button>
                                </div>

                                <motion.ul
                                    className="mobile-nav-links"
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={{
                                        open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                                        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                                    }}
                                >
                                    {['About', 'Features', 'Gallery', 'Get Involved'].map((item, index) => {
                                        const href = item === 'Get Involved' ? '#contact' : `#${item.toLowerCase()}`;
                                        return (
                                            <motion.li
                                                key={item}
                                                variants={{
                                                    open: { y: 0, opacity: 1 },
                                                    closed: { y: 20, opacity: 0 }
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                            >
                                                <a href={href} onClick={() => setIsMobileMenuOpen(false)}>
                                                    {item}
                                                </a>
                                            </motion.li>
                                        );
                                    })}
                                </motion.ul>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
