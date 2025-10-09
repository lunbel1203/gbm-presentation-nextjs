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

        // Estado inicial - todos los elementos ocultos excepto el título
        gsap.set('.contingency-title', { opacity: 1 });
        gsap.set('.planIntro-section', { opacity: 0 });
        gsap.set('.planIntro2-section', { opacity: 0 });
        gsap.set('.doIt-section', { opacity: 0 });
        gsap.set('.doIt2-section', { opacity: 0 });

        // ScrollTrigger para la sección con pin
        createOptimizedScrollTrigger({
            trigger: '.contingencyPlanTrigger-section',
            start: 'top top',
            end: '+=10000', // Scroll largo para dar tiempo a leer cada sección
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Definir los rangos de tiempo para cada sección
                // Cada sección tiene: fade in (10%) + tiempo de lectura (15%) + fade out (10%) = 35% total

                // 1. planIntro-section (0% - 25%)
                if (progress >= 0 && progress <= 0.10) {
                    // Fade in
                    const fadeInProgress = progress / 0.10;
                    gsap.set('.planIntro-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.10 && progress <= 0.20) {
                    // Tiempo para leer (completamente visible)
                    gsap.set('.planIntro-section', { opacity: 1, display: 'block' });
                } else if (progress > 0.20 && progress <= 0.25) {
                    // Fade out
                    const fadeOutProgress = (progress - 0.20) / 0.05;
                    gsap.set('.planIntro-section', { opacity: 1 - fadeOutProgress, display: 'block' });
                } else if (progress > 0.25) {
                    gsap.set('.planIntro-section', { opacity: 0, display: 'none' });
                }

                // 2. planIntro2-section (25% - 50%)
                if (progress >= 0.25 && progress <= 0.35) {
                    // Fade in
                    const fadeInProgress = (progress - 0.25) / 0.10;
                    gsap.set('.planIntro2-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.35 && progress <= 0.45) {
                    // Tiempo para leer
                    gsap.set('.planIntro2-section', { opacity: 1, display: 'block' });
                } else if (progress > 0.45 && progress <= 0.50) {
                    // Fade out
                    const fadeOutProgress = (progress - 0.45) / 0.05;
                    gsap.set('.planIntro2-section', { opacity: 1 - fadeOutProgress, display: 'block' });
                } else if (progress > 0.50 || progress < 0.25) {
                    gsap.set('.planIntro2-section', { opacity: 0, display: 'none' });
                }

                // 3. doIt-section (50% - 75%)
                if (progress >= 0.50 && progress <= 0.60) {
                    // Fade in
                    const fadeInProgress = (progress - 0.50) / 0.10;
                    gsap.set('.doIt-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.60 && progress <= 0.70) {
                    // Tiempo para leer
                    gsap.set('.doIt-section', { opacity: 1, display: 'block' });
                } else if (progress > 0.70 && progress <= 0.75) {
                    // Fade out
                    const fadeOutProgress = (progress - 0.70) / 0.05;
                    gsap.set('.doIt-section', { opacity: 1 - fadeOutProgress, display: 'block' });
                } else if (progress > 0.75 || progress < 0.50) {
                    gsap.set('.doIt-section', { opacity: 0, display: 'none' });
                }

                // 4. doIt2-section (75% - 100%)
                if (progress >= 0.75 && progress <= 0.85) {
                    // Fade in
                    const fadeInProgress = (progress - 0.75) / 0.10;
                    gsap.set('.doIt2-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.85 && progress <= 1.0) {
                    // Tiempo para leer (se mantiene visible hasta el final)
                    gsap.set('.doIt2-section', { opacity: 1, display: 'block' });
                } else if (progress < 0.75) {
                    gsap.set('.doIt2-section', { opacity: 0, display: 'none' });
                }
            }
        });
    }, []);


    return (
        <>
            <section id="contingency-plan" className="contingencyPlanTrigger-section w-full min-h-screen bg-gradient-to-br from-slate-50 to-white relative">

                <div className="w-full flex flex-col justify-center items-center px-8 lg:px-20 py-16 pb-32">
                    
                    {/* Título Principal */}
                    <div className="contingency-title text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">PLAN DE CONTINGENCIA</h2>
                        <div className="w-24 h-1 bg-gbm-green mx-auto"></div>
                    </div>

                    <div className="w-3/4 space-y-20">

                        {/* 1. INTRODUCCIÓN */}
                        <div className="planIntro-section" style={{ opacity: 0 }}>
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-01.jpg"
                                        alt="Contingency Plan 01"
                                        width={250}
                                        height={500}
                                        className={`w-full object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-01.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-01.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                        Reconociendo la importancia de la consistencia en el mantenimiento de sus espacios, hemos desarrollado un Plan de Contingencia robusto para atender cualquier eventualidad que pueda surgir, tales como:
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* 2. SITUACIONES */}
                        <div className="planIntro2-section" style={{ opacity: 0, display: 'none' }}>
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-02.jpg"
                                        alt="Contingency Plan 02"
                                        width={500}
                                        height={500} 
                                        className={`w-full object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-02.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-02.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center">
                                    <ul className="space-y-4 text-2xl text-right font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">
                                        <li className="flex items-center justify-center lg:justify-start">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Ausencias
                                        </li>
                                        <li className="flex items-center justify-center lg:justify-start">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Emergencias del Personal
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 3. CÓMO LO HACEMOS */}
                        <div className="doIt-section" style={{ opacity: 0, display: 'none' }}>
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-03.jpg"
                                        alt="Contingency Plan 03"
                                        width={500}
                                        height={500}
                                        className={`w-full object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-03.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-03.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <h3 className="text-2xl lg:text-6xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">¿CÓMO LO HACEMOS?</h3>
                                </div>
                            </div>
                        </div>

                        {/* 4. NUESTRA SOLUCIÓN */}
                        <div className="doIt2-section" style={{ opacity: 0, display: 'none' }}>
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                                <div className="lg:w-1/2">
                                    <Image
                                        src="/assets/images/contingency-plan-04.jpg"
                                        alt="Contingency Plan 04"
                                        width={500}
                                        height={500}
                                        className={`w-full object-cover shadow-xl border-8 border-white rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${
                                            clickedImageSrc === '/assets/images/contingency-plan-04.jpg' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/contingency-plan-04.jpg', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="lg:w-1/2 text-center lg:text-right">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">
                                        Contamos con un equipo de apoyo especializado listo para intervenir si su empleado asignado principal no está disponible, garantizando que todas las tareas diarias se completen sin contratiempos. Cada miembro del equipo está capacitado en los protocolos de seguridad específicos del sitio, por lo que las operaciones de su instalación continúan sin interrupciones y los estándares de calidad se cumplen consistentemente.
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