import React from 'react';
import './Footer.css';
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer } from 'react-icons/si';

const techLogos = [
    { node: <SiReact color="white" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs color="white" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript color="white" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss color="white" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiVite color="white" />, title: "Vite", href: "https://vitejs.dev" },
    { node: <SiFramer color="white" />, title: "Framer Motion", href: "https://www.framer.com/motion" },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2>PORSCHE</h2>
                    <p>Beyond Limits</p>
                </div>

                <div className="w-full h-24 relative overflow-hidden my-8">
                    <LogoLoop
                        logos={techLogos}
                        speed={50}
                        direction="left"
                        logoHeight={32}
                        gap={40}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut={false}
                    />
                </div>

                <div className="footer-copyright">
                    <p>© 2025 All Rights Reserved Sujal Shukla</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
