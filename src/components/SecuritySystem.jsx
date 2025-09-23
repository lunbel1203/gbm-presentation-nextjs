import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SecuritySystem () {
    const [lightboxImage, setLightboxImage] = useState(null);
    const [clickedImageSrc, setClickedImageSrc] = useState(null);

    const openLightbox = (imageSrc, event) => {
        event.stopPropagation();
        setClickedImageSrc(imageSrc);
        setLightboxImage(imageSrc);
    }

    const closeLightbox = () => {
        setLightboxImage(null);
        setClickedImageSrc(null);
    }

    useGSAP(() => {
        // Estado inicial - título y items ocultos
        gsap.set('.title', { y: 100, opacity: 0 });
        gsap.set('.security-item', { y: 100, opacity: 0 });

        // ScrollTrigger para la sección
        ScrollTrigger.create({
            trigger: '.securitySystem-section',
            start: 'top top',
            end: '+=4000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación del título (0% - 20%)
                if (progress <= 0.2) {
                    const titleProgress = progress / 0.2;
                    gsap.set('.title', {
                        y: gsap.utils.interpolate(100, 0, titleProgress),
                        opacity: gsap.utils.interpolate(0, 1, titleProgress)
                    });
                } else {
                    gsap.set('.title', { y: 0, opacity: 1 });
                }

                // Animación de los items secuencialmente
                const items = document.querySelectorAll('.security-item');
                items.forEach((item, index) => {
                    const itemStartProgress = 0.2 + (index * 0.2); // Items empiezan desde 20% espaciados cada 20%
                    const itemEndProgress = itemStartProgress + 0.15; // Cada item dura 15% del scroll

                    if (progress >= itemStartProgress && progress <= itemEndProgress) {
                        const localProgress = (progress - itemStartProgress) / 0.15;
                        gsap.set(item, {
                            y: gsap.utils.interpolate(100, 0, localProgress),
                            opacity: gsap.utils.interpolate(0, 1, localProgress)
                        });
                    } else if (progress > itemEndProgress) {
                        gsap.set(item, { y: 0, opacity: 1 });
                    } else {
                        gsap.set(item, { y: 100, opacity: 0 });
                    }
                });
            }
        });
    }, []);

    return (
        <>
            <section id="security-system" className="securitySystem-section w-full h-screen flex items-center bg-slate-200 relative">

                <div className="securitySystem-overlay w-full flex flex-col items-center px-8 lg:px-20">
                    
                    {/* Título de la sección */}
                    <div className="title w-full text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">SECURITY SYSTEM</h2>
                        <div className="w-24 h-1 bg-gbm-green mx-auto"></div>
                    </div>

                    {/* Grid Container */}
                    <div className="securitySystem-container max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Item 1 - Top Left */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-01.jpg" 
                                    alt="Background checks & screenings" 
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-01.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-01.jpg', e)}
                                />
                            </div>
                            <div className="text-content">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Checks & Screenings</h3>
                            </div>
                        </div>

                        {/* Item 2 - Top Right */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-02.jpg" 
                                    alt="Uniformed staff with ID badges" 
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-02.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-02.jpg', e)}
                                />
                            </div>
                            <div className="text-content">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Uniformed Staff with ID Badges</h3>
                            </div>
                        </div>

                        {/* Item 3 - Bottom Left */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-03.jpg" 
                                    alt="Trained on client security protocols" 
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-03.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-03.jpg', e)}
                                />
                            </div>
                            <div className="text-content mb-6">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Trained on All Client Security Protocols</h3>
                            </div>
                        </div>

                        {/* Item 4 - Bottom Right */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-04.png" 
                                    alt="Real-time location & time tracking system" 
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-04.png' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-04.png', e)}
                                />
                            </div>
                            <div className="text-content">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Real-time Location & Time Tracking</h3>
                            </div>
                        </div>

                    </div>
                    
                </div>

            </section>

            {/* Lightbox usando Portal */}
            {lightboxImage && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl max-h-[80vh] p-4">
                        <img 
                            src={lightboxImage} 
                            alt="Lightbox Image" 
                            className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border-8 border-white"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button 
                            onClick={closeLightbox}
                            className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors duration-200"
                        >
                            ×
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}