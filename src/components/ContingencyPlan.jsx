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

        // ScrollTrigger para la sección con pin (2 pasos: titular + flujo, y texto)
        createOptimizedScrollTrigger({
            trigger: '.contingencyPlanTrigger-section',
            start: 'top top',
            end: '+=5000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // 1. planIntro-section (0% - 50%)
                if (progress <= 0.10) {
                    gsap.set('.planIntro-section', { opacity: progress / 0.10, display: 'block' });
                } else if (progress <= 0.42) {
                    gsap.set('.planIntro-section', { opacity: 1, display: 'block' });
                } else if (progress <= 0.50) {
                    gsap.set('.planIntro-section', { opacity: 1 - (progress - 0.42) / 0.08, display: 'block' });
                } else {
                    gsap.set('.planIntro-section', { opacity: 0, display: 'none' });
                }

                // 2. planIntro2-section (50% - 100%)
                if (progress < 0.50) {
                    gsap.set('.planIntro2-section', { opacity: 0, display: 'none' });
                } else if (progress <= 0.60) {
                    gsap.set('.planIntro2-section', { opacity: (progress - 0.50) / 0.10, display: 'block' });
                } else {
                    gsap.set('.planIntro2-section', { opacity: 1, display: 'block' });
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
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">CONTINUIDAD DEL SERVICIO</h2>
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
                                    <h3 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-8 leading-tight">
                                        Su Instalación No Se Detiene Porque Alguien Falta.
                                    </h3>
                                    <div className="flex flex-col lg:flex-row items-center gap-3 text-lg font-bold">
                                        <span className="px-4 py-3 rounded-lg bg-slate-100 text-[#194263] border border-gray-200">Ausencia del Empleado</span>
                                        <span className="text-gbm-green text-2xl">→</span>
                                        <span className="px-4 py-3 rounded-lg bg-slate-100 text-[#194263] border border-gray-200">Equipo de Apoyo Glaring</span>
                                        <span className="text-gbm-green text-2xl">→</span>
                                        <span className="px-4 py-3 rounded-lg bg-gbm-green text-white">El Servicio Continúa</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. NUESTRA SOLUCIÓN */}
                        <div className="planIntro2-section" style={{ opacity: 0, display: 'none' }}>
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
                                    <p className="text-2xl font-bold text-[#194263] leading-relaxed mb-6">
                                        Cuando un empleado asignado no está disponible, nuestro equipo de apoyo puede intervenir para ayudar a mantener la continuidad del servicio.
                                    </p>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        Los miembros del equipo de reemplazo reciben información específica del sitio, incluidos los requisitos de seguridad, protección y servicio.
                                    </p>
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