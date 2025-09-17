import React, { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SecuritySystem () {
    const [lightboxImage, setLightboxImage] = useState(null);
    const [originPosition, setOriginPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [clickedImageSrc, setClickedImageSrc] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const openLightbox = (imageSrc, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOriginPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height
        });
        setClickedImageSrc(imageSrc);
        setLightboxImage(imageSrc);
        setIsClosing(false);
    }

    const closeLightbox = () => {
        setIsClosing(true);
        // Esperar a que termine completamente la animación
        setTimeout(() => {
            setLightboxImage(null);
            setClickedImageSrc(null);
            setIsClosing(false);
        }, 500); // Duración completa de la animación
    }

    useGSAP(() => {
        // Configuración inicial - container completamente oculto abajo
        gsap.set('.securitySystem-container', { y: '150vh' });

        // ScrollTrigger para animar securitySystem-container con pin
        ScrollTrigger.create({
            trigger: '.securitySystem-section',
            start: 'top top',
            end: '+=3000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set('.securitySystem-container', {
                    y: gsap.utils.interpolate('150vh', '-60vh', progress)
                });
            }
        });

    }, []);

    return (
        <>
            <section className="securitySystem-section w-full h-screen flex items-center bg-slate-200 relative">
                
                <div className="securitySystem-overlay w-[70%] flex items-center px-20 inset-0">
                    <div className="securitySystem-container w-full flex flex-col gap-12 p-8">

                        {/* Item 1 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="photo-securitySystem w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-01.jpg" 
                                    alt="Background checks & screenings" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-01.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-01.jpg', e)}
                                />
                            </div>
                            <div className="text-content w-1/2 pl-8">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">Checks & Screenings</h3>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="text-content w-1/2 pr-8 text-right">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">Uniformed Staff with ID Badges</h3>
                            </div>
                            <div className="photo-securitySystem w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-02.jpg" 
                                    alt="Uniformed staff with ID badges" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-02.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-02.jpg', e)}
                                />
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="photo-securitySystem w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-03.jpg" 
                                    alt="Trained on client security protocols" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-03.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-03.jpg', e)}
                                />
                            </div>
                            <div className="text-content w-1/2 pl-8">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">Trained on All Client Security Protocols</h3>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="text-content w-1/2 pr-8 text-right">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">Real-time Location & Time Tracking</h3>
                            </div>
                            <div className="photo-securitySystem w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/Security-System-04.png" 
                                    alt="Real-time location & time tracking system" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Security-System-04.png' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Security-System-04.png', e)}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Título de la sección fijo */}
                <div className="title w-[30%] text-left">
                    <h2 className="w-full text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-10">SECURITY SYSTEM</h2>
                    <div className="w-24 h-1 bg-gbm-green mb-10"></div>
                </div>

                {/* Lightbox */}
                {lightboxImage && (
                    <div 
                        className={`fixed inset-0 bg-black/95 bg-opacity-60 flex items-center justify-center z-50 cursor-pointer ${
                            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                        }`}
                        onClick={closeLightbox}
                    >
                        <div 
                            className={`relative max-w-4xl max-h-[80vh] p-4 ${
                                isClosing ? 'animate-collapseToOrigin' : 'animate-expandFromOrigin'
                            }`}
                            style={{
                                '--origin-x': `${originPosition.x}px`,
                                '--origin-y': `${originPosition.y}px`,
                                '--origin-width': `${originPosition.width}px`,
                                '--origin-height': `${originPosition.height}px`
                            }}
                        >
                            <img 
                                src={lightboxImage} 
                                alt="Lightbox Image" 
                                className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border-8 border-white transition-transform duration-300"
                            />
                            <button 
                                onClick={closeLightbox}
                                className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors duration-200"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </section>
            
            {/* Estilos CSS para las animaciones */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
                
                @keyframes expandFromOrigin {
                    0% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.01);
                        opacity: 0;
                    }
                    30% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.3);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes collapseToOrigin {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    70% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.3);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.01);
                        opacity: 0;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                
                .animate-fadeOut {
                    animation: fadeOut 0.5s ease-out;
                }
                
                .animate-expandFromOrigin {
                    animation: expandFromOrigin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-collapseToOrigin {
                    animation: collapseToOrigin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </>
    )
}