import React, { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContingencyPlan () {
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
        gsap.set('.contingencyPlan-overlay', { y: '50vh', opacity: 0 });

        // ScrollTrigger para animar contingencyPlan-overlay con pin
        ScrollTrigger.create({
            trigger: '.contingencyPlan-section',
            start: 'top 30%',
            end: '+=8000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Opacidad llega a 1 cuando el progress es 0.1 (10%)
                const opacityProgress = Math.min(progress / 0.1, 1);
                
                gsap.set('.contingencyPlan-overlay', {
                    y: gsap.utils.interpolate('50vh', '-250vh', progress),
                    opacity: opacityProgress,
                    pointerEvents: 'auto' // Asegurar que los eventos funcionen
                });
            }
        });

    }, []);

    return (
        <>
            <section className="contingencyPlan-section w-full h-screen flex flex-wrap justify-center items-center bg-white mb-10 relative">
                
                <div className="contingencyPlan-overlay w-full flex flex-wrap justify-center items-center px-20 inset-0">
                    {/* Título de la sección fijo */}
                    <div className="title w-full text-center mt-20 z-50">
                        <h2 className="w-full text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-10">CONTINGENCY PLAN</h2>
                        <div className="w-24 h-1 mx-auto bg-gbm-green mb-10"></div>
                    </div>

                    <div className="contingencyPlan-container w-3/4 flex flex-col gap-12 p-8">

                        {/* Item 1 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="photo-contingencyPlan w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer relative z-10">
                                <img 
                                    src="/assets/images/Contingency-Plan-01.jpg" 
                                    alt="Background checks & screenings" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Contingency-Plan-01.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Contingency-Plan-01.jpg', e)}
                                />
                            </div>
                            <div className="text-content w-1/2 pl-8">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                    Recognizing the importance of consistency in the maintenance of your spaces, we have developed a robust Contingency Plan to address any eventualities that may arise, such as:
                                </h3>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="text-content w-1/2 pr-8 text-right">
                                <ul className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                    <li>Call outs</li>
                                    <li>Personnel Emergencies</li>
                                </ul>
                            </div>
                            <div className="photo-contingencyPlan w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer relative z-10">
                                <img 
                                    src="/assets/images/Contingency-Plan-02.jpg" 
                                    alt="Uniformed staff with ID badges" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Contingency-Plan-02.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Contingency-Plan-02.jpg', e)}
                                />
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="photo-contingencyPlan w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer relative z-10">
                                <img 
                                    src="/assets/images/Contingency-Plan-03.jpg" 
                                    alt="Trained on client security protocols" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Contingency-Plan-03.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Contingency-Plan-03.jpg', e)}
                                />
                            </div>
                            <div className="text-content w-1/2 pl-8">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">HOW WE DO IT?</h3>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="security-item flex items-center gap-8 mb-8">
                            <div className="text-content w-1/2 pr-8 text-right">
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                    We have a specialized support team ready to step in if your primary assigned employee is unavailable, ensuring that all daily tasks are completed seamlessly. Each team member is trained in site-specific safety and security protocols, so your facility’s operations continue without disruption and quality standards are consistently met.
                                </h3>
                            </div>
                            <div className="photo-contingencyPlan w-1/2 transform hover:scale-105 transition-transform duration-300 cursor-pointer relative z-10">
                                <img 
                                    src="/assets/images/Contingency-Plan-04.jpg" 
                                    alt="Real-time location & time tracking system" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/Contingency-Plan-04.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/Contingency-Plan-04.jpg', e)}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            {/* Lightbox - fuera de la sección pinned */}
            {lightboxImage && (
                <div 
                    className={`fixed inset-0 bg-black/95 bg-opacity-60 flex items-center justify-center z-[9999] cursor-pointer ${
                        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                    }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeLightbox();
                        }
                    }}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                closeLightbox();
                            }}
                            className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors duration-200"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            
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