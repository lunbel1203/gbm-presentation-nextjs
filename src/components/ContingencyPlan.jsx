import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'

export default function ContingencyPlan () {
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
        if (typeof window === 'undefined') return;

        // Estado inicial - todos los elementos ocultos
        gsap.set('.contingency-title', { y: 100, opacity: 0 });
        gsap.set('.story-section', { y: 100, opacity: 0 });

        // ScrollTrigger para la sección
        createOptimizedScrollTrigger({
            trigger: '.contingencyPlan-section',
            start: 'top top',
            end: '+=3500',
            scrub: 0.3,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación del título (0% - 15%)
                if (progress <= 0.15) {
                    const titleProgress = progress / 0.15;
                    gsap.set('.contingency-title', {
                        y: gsap.utils.interpolate(100, 0, titleProgress),
                        opacity: gsap.utils.interpolate(0, 1, titleProgress)
                    });
                } else {
                    gsap.set('.contingency-title', { y: 0, opacity: 1 });
                }

                // Animación de las secciones con timing más suave
                const sections = document.querySelectorAll('.story-section');
                sections.forEach((section, index) => {
                    // Empezamos desde 15% con más espacio entre secciones
                    const sectionStart = 0.15 + (index * 0.2); // Cada sección empieza cada 20%
                    const sectionEnd = sectionStart + 0.3; // Cada sección dura 30% (con más solapamiento)

                    if (progress >= sectionStart && progress <= sectionEnd) {
                        const localProgress = (progress - sectionStart) / 0.3;
                        // Suavizado exponencial para evitar saltos bruscos
                        const smoothProgress = gsap.utils.interpolate(0, 1, Math.pow(localProgress, 0.8));
                        
                        gsap.set(section, {
                            y: gsap.utils.interpolate(30, 0, smoothProgress),
                            opacity: gsap.utils.interpolate(0, 1, smoothProgress),
                            scale: gsap.utils.interpolate(0.98, 1, smoothProgress)
                        });
                    } else if (progress > sectionEnd) {
                        gsap.set(section, { y: 0, opacity: 1, scale: 1 });
                    } else {
                        gsap.set(section, { y: 30, opacity: 0, scale: 0.98 });
                    }
                });
            }
        });
    }, []);

    return (
        <>
            <section id="contingency-plan" className="contingencyPlan-section w-full min-h-screen bg-gradient-to-br from-slate-50 to-white relative">
                
                <div className="w-full flex flex-col items-center px-8 lg:px-20 py-16">
                    
                    {/* Título Principal */}
                    <div className="contingency-title text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">CONTINGENCY PLAN</h2>
                        <div className="w-24 h-1 bg-gbm-green mx-auto"></div>
                    </div>

                    <div className="max-w-4xl w-full space-y-20">

                        {/* 1. INTRODUCCIÓN */}
                        <div className="story-section">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-01.jpg"
                                        alt="Contingency Plan 01"
                                        width={500}
                                        height={500}
                                        className={`w-full h-96 lg:h-[500px] object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-01.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-01.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                        Recognizing the importance of consistency in the maintenance of your spaces, we have developed a robust Contingency Plan to address any eventualities that may arise, such as:
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* 2. SITUACIONES */}
                        <div className="story-section">
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-02.jpg"
                                        alt="Contingency Plan 02"
                                        width={500}
                                        height={500} 
                                        className={`w-full h-96 lg:h-[500px] object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-02.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-02.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center">
                                    <ul className="space-y-4 text-2xl lg:text-3xl text-right font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">
                                        <li className="flex items-center justify-center lg:justify-start">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Call outs
                                        </li>
                                        <li className="flex items-center justify-center lg:justify-start">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Personnel Emergencies
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 3. CÓMO LO HACEMOS */}
                        <div className="story-section">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-03.jpg"
                                        alt="Contingency Plan 03"
                                        width={500}
                                        height={500}
                                        className={`w-full h-96 lg:h-[500px] object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-03.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-03.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <h3 className="text-2xl lg:text-6xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">HOW WE DO IT?</h3>
                                </div>
                            </div>
                        </div>

                        {/* 4. NUESTRA SOLUCIÓN */}
                        <div className="story-section">
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-04.jpg"
                                        alt="Contingency Plan 04"
                                        width={500}
                                        height={500}
                                        className={`w-full h-96 lg:h-[500px] object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-04.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-04.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center lg:text-right">
                                    <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                        We have a specialized support team ready to step in if your primary assigned employee is unavailable, ensuring that all daily tasks are completed seamlessly. Each team member is trained in site-specific safety and security protocols, so your facility's operations continue without disruption and quality standards are consistently met.
                                    </h3>
                                </div>
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
                        <Image
                            src={lightboxImage}
                            alt="Lightbox Image"
                            width={800}
                            height={600}
                            className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border-8 border-white"
                            onClick={(e) => e.stopPropagation()}
                            sizes="80vw"
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