import React from 'react';
import { ThreeDPhotoCarousel } from './ui/3d-carousel';

const Gallery = () => {
    return (
        <div id="gallery" className="py-20 min-h-screen">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold tracking-tight sm:text-6xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    Visual Journey
                </h2>
                <p className="mt-4 text-lg text-neutral-300">
                    Explore the legacy.
                </p>
            </div>
            <div className="w-full">
                <div className="min-h-[500px] flex flex-col justify-center rounded-lg space-y-4">
                    <div className="p-2">
                        <ThreeDPhotoCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
