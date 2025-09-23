import React, { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GlaringClean () {
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
        // Configuración inicial
        gsap.set('.glaringClean-section  .title', { x: -200, opacity: 0 });
        gsap.set('.photo-frame', { y: 1000 });

        // ScrollTrigger para la sección
        ScrollTrigger.create({
            trigger: '.glaringClean-section',
            start: 'top top',
            end: '+=3000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación del H2 (0% - 30%)
                if (progress <= 0.3) {
                    const titleProgress = progress / 0.3;
                    gsap.set('.glaringClean-section .title', {
                        x: gsap.utils.interpolate(-200, 0, titleProgress),
                        opacity: gsap.utils.interpolate(0, 1, titleProgress)
                    });
                } else {
                    gsap.set('.glaringClean-section  .title', { x: 0, opacity: 1 });
                }

                // Animación de las fotos (30% - 60%)
                if (progress >= 0.2 && progress <= 0.6) {
                    const imagesProgress = (progress - 0.3) / 0.3;
                    gsap.set('.photo-frame', {
                        y: gsap.utils.interpolate(1000, 0, imagesProgress)
                    });
                } else if (progress > 0.2) {
                    // Fotos se quedan visibles después del 60%
                    gsap.set('.photo-frame', {
                        y: 0
                    });
                }
            }
        });

    }, []);

    return (
        <>
            <section id="glaring-clean" className="glaringClean-section w-full h-screen flex items-center bg-slate-50 px-20 relative">
                <div className="title w-[45%] text-left">
                    <h2 className="w-full h-40 text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-10">It's not just clean, <br /> it's Glaring clean!</h2>
                    <div className="w-24 h-1 bg-gbm-green"></div>
                </div>

                <div className="imagesSection w-[55%] flex justify-between items-center gap-6 p-4">
                    <div className="leftColumn w-[50%]">
                        <div className="photo-frame w-full transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img 
                                src="/assets/images/glaring-clean-01.jpg" 
                                alt="Glaring Clean 1" 
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/glaring-clean-01.jpg' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/glaring-clean-01.jpg', e)}
                            />
                        </div>
                        <div className="photo-frame transform -rotate-2 hover:rotate-0 hover:scale-105 transition-transform duration-300 mt-8 cursor-pointer">
                            <img 
                                src="/assets/images/glaring-clean-02.jpg" 
                                alt="Glaring Clean 2" 
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/glaring-clean-02.jpg' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/glaring-clean-02.jpg', e)}
                            />
                        </div>
                    </div>
                    <div className="photo-frame w-[50%] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                        <img 
                            src="/assets/images/glaring-clean-03.jpg" 
                            alt="Glaring Clean 3" 
                            className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                clickedImageSrc === '/assets/images/glaring-clean-03.jpg' ? 'opacity-0' : 'opacity-100'
                            }`}
                            onClick={(e) => openLightbox('/assets/images/glaring-clean-03.jpg', e)}
                        />
                    </div>
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