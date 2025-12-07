import React from "react";
import { motion as Motion, useScroll, useSpring, useTransform } from "framer-motion";

const images = [
    "https://images.pexels.com/photos/1010648/pexels-photo-1010648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8665530/pexels-photo-8665530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const KineticGridItem = ({ image, scrollVelocity }) => {
    const smoothedVelocity = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <Motion.div
            className="w-full h-80 relative overflow-hidden rounded-lg"
            style={{ skewX: skew }}
        >
            <img
                src={image}
                alt="A landscape"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                    transform: "scale(1.15)"
                }}
            />
        </Motion.div>
    );
};

const KineticScrollGallery = () => {
    // Explicitly pass container ref if needed, but useScroll() works on window by default
    // or we can scope it to a container ref if we want. Code uses global window scroll.
    const { scrollYProgress } = useScroll();

    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000],
        { clamp: false }
    );

    return (
        <div className="bg-transparent text-neutral-50 min-h-screen py-20" id="gallery">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
                        Kinetic Gallery
                    </h2>
                    <p className="mt-4 text-lg text-neutral-300">
                        Scroll fast to warp the fabric of space-time.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, index) => (
                        <KineticGridItem
                            key={index}
                            image={img}
                            scrollVelocity={scrollYVelocity}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KineticScrollGallery;
