import React, { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function QaulityAssurance () {
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
        gsap.set('.qualityAssurance-section .title', { y: 200, opacity: 0 });
        gsap.set('.qualityAssurance-imagesSection', { y: 1000, opacity: 0 });

        // ScrollTrigger para la sección
        ScrollTrigger.create({
            trigger: '.qualityAssurance-section',
            start: 'top top',
            end: '+=6000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación del H2 (0% - 50%)
                if (progress <= 0.5) {
                    const titleProgress = progress / 0.5;
                    gsap.set('.qualityAssurance-section  .title', {
                        y: gsap.utils.interpolate(200, -300, titleProgress),
                        opacity: gsap.utils.interpolate(0, 1, titleProgress)
                    });
                } else {
                    gsap.set('.qualityAssurance-section  .title', { y: -300, opacity: 1 });
                }

                // Animación de toda la sección de imágenes (20% - 100%)
                if (progress >= 0.2) {
                    const imagesProgress = (progress - 0.2) / 0.8;
                    gsap.set('.qualityAssurance-imagesSection', {
                        y: gsap.utils.interpolate(1000, -1200, imagesProgress),
                        opacity: gsap.utils.interpolate(0, 1, Math.min(imagesProgress * 3, 1))
                    });
                }
            }
        });

    }, []);

    return (
        <>
            <section className="qualityAssurance-section w-full h-screen relative">
                <div className="qualityAssurance-overlay w-full flex flex-wrap items-center px-20 bg-gray-100 absolute inset-0">
                    <div className="qualityAssurance-imagesSection w-[50%] flex flex-wrap items-center gap-6 p-4">
                        <p className='w-full text-2xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold'>Cleaning and maintenance supervisors monitor and inspects constantly to ensure that duties are adequately carried out.</p>
                        <div className="photo-qualityAssurance w-[calc(100%/2-50px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <img 
                                src="/assets/images/QualityAssurance.png" 
                                alt="Glaring Clean 2" 
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/QualityAssurance.png' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/QualityAssurance.png', e)}
                            />
                        </div>
                        <div className="photo-qualityAssurance w-[calc(100%/2-50px)] transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img 
                                src="/assets/images/QualityAssurance-02.png" 
                                alt="Glaring Clean 1" 
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/QualityAssurance-02.png' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/QualityAssurance-02.png', e)}
                            />
                        </div>
                        <h3 className='w-full text-4xl pt-20 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold'>WHAT ARE THESE INSPECTIONS?</h3>
                        <ul className='w-full text-xl list-disc bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold'>
                            <li>Cleaning and janitorial inspections.</li>
                            <li>Safety inspections.</li>
                            <li>Routine maintenance and corrective actions.</li>
                            <li>APPA and CIMS cleaning standar inspections.</li>
                        </ul>
                        <div className="photo-qualityAssurance w-[calc(100%/2-50px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <img 
                                src="/assets/images/QualityAssurance-03.jpg" 
                                alt="Glaring Clean 2" 
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/QualityAssurance-03.jpg' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/QualityAssurance-03.jpg', e)}
                            />
                        </div>
                        <div className="leftColumn w-[calc(100%/2-50px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <div className="photo-qualityAssurance w-full transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <img 
                                    src="/assets/images/QualityAssurance-04.jpg" 
                                    alt="Glaring Clean 1" 
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                        clickedImageSrc === '/assets/images/QualityAssurance-04.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/QualityAssurance-04.jpg', e)}
                                />
                            </div>
                        </div>
                        <h3 className='w-full text-4xl pt-20 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold'>WHY THIS DATA?</h3>
                        <ul className='w-full text-xl list-disc bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold'>
                            <li>Identify possible deficiencies.</li>
                            <li>Identify opportunities for improvement.</li>
                            <li>Identify where to focus the constant training of our employees.</li>
                            <li>Key performance indicator KPI.</li>
                            <li>Bonuses, and annual incentives.</li>
                        </ul>
                    </div>
                    <div className="title w-[50%] text-left pl-10">
                        <h2 className="w-full text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-10">Quality Assurance</h2>
                        <div className="w-24 h-1 bg-gbm-green mb-10"></div>
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