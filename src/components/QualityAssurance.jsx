import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react';
import { RiClipboardLine, RiSearchLine, RiBarChartLine } from '@remixicon/react';

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

        // Estado inicial - todos los elementos ocultos
        gsap.set('.quality-title', { y: 100, opacity: 0 });
        gsap.set('.quality-section', { y: 100, opacity: 0 });

        // ScrollTrigger optimizado para la sección
        createOptimizedScrollTrigger({
            trigger: '.qualityAssurance-section',
            start: 'top top',
            end: '+=3500',
            scrub: 0.4,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación del título (0% - 18%)
                if (progress <= 0.18) {
                    const titleProgress = progress / 0.18;
                    gsap.set('.quality-title', {
                        y: gsap.utils.interpolate(100, 0, titleProgress),
                        opacity: gsap.utils.interpolate(0, 1, titleProgress)
                    });
                } else {
                    gsap.set('.quality-title', { y: 0, opacity: 1 });
                }

                // Animación de las secciones con mejor timing
                const sections = document.querySelectorAll('.quality-section');
                sections.forEach((section, index) => {
                    const sectionStartProgress = 0.18 + (index * 0.22); // Secciones empiezan desde 18% espaciadas cada 22%
                    const sectionEndProgress = sectionStartProgress + 0.25; // Cada sección dura 25% del scroll con solapamiento

                    if (progress >= sectionStartProgress && progress <= sectionEndProgress) {
                        const localProgress = (progress - sectionStartProgress) / 0.25;
                        const smoothProgress = gsap.utils.interpolate(0, 1, Math.pow(localProgress, 0.75));
                        gsap.set(section, {
                            y: gsap.utils.interpolate(80, 0, smoothProgress),
                            opacity: gsap.utils.interpolate(0, 1, smoothProgress)
                        });
                    } else if (progress > sectionEndProgress) {
                        gsap.set(section, { y: 0, opacity: 1 });
                    } else {
                        gsap.set(section, { y: 80, opacity: 0 });
                    }
                });
            }
        });
    }, []);

    return (
        <>
            <section id="quality-assurance" className="qualityAssurance-section w-full min-h-screen bg-gradient-to-br from-gray-50 to-white relative">
                
                <div className="w-full flex flex-col items-center px-8 lg:px-20 py-16">
                    
                    {/* Título Principal */}
                    <div className="quality-title text-center mb-16">
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">Quality Assurance</h2>
                        <div className="w-24 h-1 bg-gbm-green mx-auto"></div>
                    </div>

                    <div className="max-w-6xl w-full space-y-20">

                        {/* 1. SUPERVISIÓN CONSTANTE */}
                        <div className="quality-section text-center">
                            <div className="flex items-center justify-center mb-8">
                                <div className="mr-4">
                                    <RiClipboardLine size={48} className="text-gbm-green" />
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">CONSTANT SUPERVISION</h3>
                            </div>
                            <p className="text-xl lg:text-2xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold mb-12 max-w-4xl mx-auto">
                                Cleaning and maintenance supervisors monitor and inspects constantly to ensure that duties are adequately carried out.
                            </p>
                            
                            {/* Imágenes de supervisión */}
                            <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
                                <div className="photo-qualityAssurance hover:scale-105 transition-transform duration-300 cursor-pointer w-full max-w-md">
                                    <Image
                                        src="/assets/images/qualityassurance.png"
                                        alt="Quality Assurance 1"
                                        width={400}
                                        height={300}
                                        className={`w-full h-auto object-contain shadow-xl border-8 border-white rounded-lg ${
                                            clickedImageSrc === '/assets/images/qualityassurance.png' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/qualityassurance.png', e)}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="photo-qualityAssurance hover:scale-105 transition-transform duration-300 cursor-pointer w-full">
                                    <Image
                                        src="/assets/images/qualityassurance-02.png"
                                        alt="Quality Assurance 2"
                                        width={800}
                                        height={400}
                                        className={`w-full h-auto object-contain shadow-xl border-8 border-white rounded-lg ${
                                            clickedImageSrc === '/assets/images/qualityassurance-02.png' ? 'opacity-0' : 'opacity-100'
                                        }`}
                                        onClick={(e) => openLightbox('/assets/images/qualityassurance-02.png', e)}
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. WHAT ARE THESE INSPECTIONS */}
                        <div className="quality-section">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="mr-4">
                                        <RiSearchLine size={48} className="text-gbm-green" />
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">WHAT ARE THESE INSPECTIONS?</h3>
                                </div>
                            </div>
                            
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2">
                                    <ul className="space-y-4 text-lg lg:text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Cleaning and janitorial inspections.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Safety inspections.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Routine maintenance and corrective actions.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            APPA and CIMS cleaning standar inspections.
                                        </li>
                                    </ul>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="photo-qualityAssurance transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                        <Image
                                            src="/assets/images/qualityassurance-03.jpg"
                                            alt="Quality Assurance 3"
                                            width={500}
                                            height={384}
                                            className={`w-full h-96 object-cover shadow-xl border-8 border-white rounded-lg ${
                                                clickedImageSrc === '/assets/images/qualityassurance-03.jpg' ? 'opacity-0' : 'opacity-100'
                                            }`}
                                            onClick={(e) => openLightbox('/assets/images/qualityassurance-03.jpg', e)}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. WHY THIS DATA */}
                        <div className="quality-section">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="mr-4">
                                        <RiBarChartLine size={48} className="text-gbm-green" />
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">WHY THIS DATA?</h3>
                                </div>
                            </div>
                            
                            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                                <div className="lg:w-1/2">
                                    <ul className="space-y-4 text-lg lg:text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Identify possible deficiencies.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Identify opportunities for improvement.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Identify where to focus the constant training of our employees.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Key performance indicator KPI.
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-3 h-3 bg-gbm-green rounded-full mr-4"></span>
                                            Bonuses, and annual incentives.
                                        </li>
                                    </ul>
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="photo-qualityAssurance transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                        <Image
                                            src="/assets/images/qualityassurance-04.jpg"
                                            alt="Quality Assurance 4"
                                            width={500}
                                            height={384}
                                            className={`w-full h-96 object-cover shadow-xl border-8 border-white rounded-lg ${
                                                clickedImageSrc === '/assets/images/qualityassurance-04.jpg' ? 'opacity-0' : 'opacity-100'
                                            }`}
                                            onClick={(e) => openLightbox('/assets/images/qualityassurance-04.jpg', e)}
                                            sizes="(max-width: 768px) 100vw, 50vw"
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