import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import { RiClipboardLine, RiSearchLine, RiBarChartLine } from '@remixicon/react'

export default function QaulityAssurance () {
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
        gsap.set('.quality-title', { opacity: 1 });
        gsap.set('.supervision-section', { opacity: 0 });
        gsap.set('.inspection-section', { opacity: 0 });
        gsap.set('.data-section', { opacity: 0 });

        // ScrollTrigger para la sección con pin
        createOptimizedScrollTrigger({
            trigger: '.qualityAssuranceTrigger-section',
            start: 'top top',
            end: '+=9000', // Scroll largo para dar tiempo a leer cada sección
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Definir los rangos de tiempo para cada sección
                // Cada sección tiene: fade in (10%) + tiempo de lectura (20%) + fade out (5%) = 35% total

                // 1. supervision-section (0% - 33%)
                if (progress >= 0 && progress <= 0.10) {
                    // Fade in
                    const fadeInProgress = progress / 0.10;
                    gsap.set('.supervision-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.10 && progress <= 0.28) {
                    // Tiempo para leer (completamente visible)
                    gsap.set('.supervision-section', { opacity: 1, display: 'block' });
                } else if (progress > 0.28 && progress <= 0.33) {
                    // Fade out
                    const fadeOutProgress = (progress - 0.28) / 0.05;
                    gsap.set('.supervision-section', { opacity: 1 - fadeOutProgress, display: 'block' });
                } else if (progress > 0.33) {
                    gsap.set('.supervision-section', { opacity: 0, display: 'none' });
                }

                // 2. inspection-section (33% - 66%)
                if (progress >= 0.33 && progress <= 0.43) {
                    // Fade in
                    const fadeInProgress = (progress - 0.33) / 0.10;
                    gsap.set('.inspection-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.43 && progress <= 0.61) {
                    // Tiempo para leer
                    gsap.set('.inspection-section', { opacity: 1, display: 'block' });
                } else if (progress > 0.61 && progress <= 0.66) {
                    // Fade out
                    const fadeOutProgress = (progress - 0.61) / 0.05;
                    gsap.set('.inspection-section', { opacity: 1 - fadeOutProgress, display: 'block' });
                } else if (progress > 0.66 || progress < 0.33) {
                    gsap.set('.inspection-section', { opacity: 0, display: 'none' });
                }

                // 3. data-section (66% - 100%)
                if (progress >= 0.66 && progress <= 0.76) {
                    // Fade in
                    const fadeInProgress = (progress - 0.66) / 0.10;
                    gsap.set('.data-section', { opacity: fadeInProgress, display: 'block' });
                } else if (progress > 0.76 && progress <= 1.0) {
                    // Tiempo para leer (se mantiene visible hasta el final)
                    gsap.set('.data-section', { opacity: 1, display: 'block' });
                } else if (progress < 0.66) {
                    gsap.set('.data-section', { opacity: 0, display: 'none' });
                }
            }
        });
    }, []);


    return (
        <>
            <section id="quality-assurance" className="qualityAssuranceTrigger-section w-full min-h-screen bg-gradient-to-br from-gray-50 to-white relative">
                
                <div className="w-full flex flex-col items-center px-8 lg:px-20 py-16">
                    
                    {/* Título Principal */}
                    <div className="quality-title text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">Quality Assurance</h2>
                        <div className="w-24 h-1 bg-gbm-green mx-auto"></div>
                    </div>

                    <div className="w-full max-w-7xl mx-auto flex flex-col gap-20">

                        {/* 1. SUPERVISIÓN CONSTANTE */}
                        <div id="supervision-section" className="supervision-section w-full text-center" style={{ opacity: 0 }}>
                            <div className="w-full">
                                <div className="flex items-center justify-center mb-8">
                                    <div className="mr-4">
                                        <RiClipboardLine size={48} className="text-gbm-green" />
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">CONSTANT SUPERVISION</h3>
                                </div>
                                <p className="text-xl lg:text-2xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold mb-12 max-w-4xl mx-auto">
                                    Cleaning and maintenance supervisors monitor and inspects constantly to ensure that duties are adequately carried out.
                                </p>
                            </div>
                            
                            {/* Imágenes de supervisión */}
                            <div className="grid grid-cols-2 items-center gap-8 max-w-4xl mx-auto">
                                <div className="photo-qualityAssurance hover:scale-105 transition-transform duration-300 cursor-pointer w-full max-w-sm">
                                    <Image
                                        src="/assets/images/qualityassurance.png"
                                        alt="Quality Assurance"
                                        width={400}
                                        height={300}
                                        className={`w-full max-h-96 object-contain shadow-xl border-8 border-white rounded-lg ${
                                            clickedImageSrc === '/assets/images/qualityassurance.png' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/qualityassurance.png', e)}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                </div>
                                <div className="photo-qualityAssurance hover:scale-105 transition-transform duration-300 cursor-pointer w-full max-w-2xl">
                                    <Image
                                        src="/assets/images/qualityassurance-02.png"
                                        alt="Quality Assurance"
                                        width={800}
                                        height={400}
                                        className={`w-full max-h-80 object-contain shadow-xl border-8 border-white rounded-lg ${
                                            clickedImageSrc === '/assets/images/qualityassurance-02.png' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/qualityassurance-02.png', e)}
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. WHAT ARE THESE INSPECTIONS */}
                        <div id="inspection-section" className="inspection-section w-full" style={{ opacity: 0, display: 'none' }}>
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="mr-4">
                                        <RiSearchLine size={48} className="text-gbm-green" />
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">WHAT ARE THESE INSPECTIONS?</h3>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
                                <div className="w-full lg:w-5/12">
                                    <ul className="space-y-6 text-lg lg:text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Cleaning and janitorial inspections.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Safety inspections.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Routine maintenance and corrective actions.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            APPA and CIMS cleaning standar inspections.
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-5/12">
                                    <div className="photo-qualityAssurance transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                        <Image
                                            src="/assets/images/qualityassurance-03.jpg"
                                            alt="Quality Assurance"
                                            width={400}
                                            height={600}
                                            className={`w-full h-auto max-h-[600px] object-cover shadow-xl border-8 border-white rounded-lg ${
                                                clickedImageSrc === '/assets/images/qualityassurance-03.jpg' ? 'opacity-0' : 'opacity-100'
                                            }`}
                                            onClick={(e) => openLightbox('/assets/images/qualityassurance-03.jpg', e)}
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. WHY THIS DATA */}
                        <div id="data-section" className="data-section w-full" style={{ opacity: 0, display: 'none' }}>
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="mr-4">
                                        <RiBarChartLine size={48} className="text-gbm-green" />
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">WHY THIS DATA?</h3>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-16">
                                <div className="w-full lg:w-5/12">
                                    <ul className="space-y-6 text-lg lg:text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Identify possible deficiencies.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Identify opportunities for improvement.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Identify where to focus the constant training of our employees.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Key performance indicator KPI.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4 flex-shrink-0"></span>
                                            Bonuses, and annual incentives.
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-5/12">
                                    <div className="photo-qualityAssurance transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                        <Image
                                            src="/assets/images/qualityassurance-04.jpg"
                                            alt="Quality Assurance"
                                            width={400}
                                            height={600}
                                            className={`w-full h-auto max-h-[600px] object-cover shadow-xl border-8 border-white rounded-lg ${
                                                clickedImageSrc === '/assets/images/qualityassurance-04.jpg' ? 'opacity-0' : 'opacity-100'
                                            }`}
                                            onClick={(e) => openLightbox('/assets/images/qualityassurance-04.jpg', e)}
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                        />
                                    </div>
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