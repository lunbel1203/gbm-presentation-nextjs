import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CrossContamination () {
    useGSAP (() => {
        // Configuración inicial - todos abajo del viewport
        gsap.set('.crossContamination-title', { y: '100vh', opacity: 0 });
        gsap.set('.crossContamination-cloths', { y: '100vh', opacity: 0 });
        gsap.set('.crossContamination-mops', { y: '100vh', opacity: 0 });

        // ScrollTrigger para la sección
        ScrollTrigger.create({
            trigger: '.crossContaminationTrigger',
            start: 'top top',
            end: '+=6000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Fase 1: Title - viene de abajo, va al centro, luego sale por arriba (0% - 50%)
                if (progress <= 0.3) {
                    const titleProgress = progress / 0.6;
                    const yPosition = gsap.utils.interpolate(100, -100, titleProgress);
                    
                    // Opacidad = 1 cuando está en el centro o más arriba (0vh)
                    let opacity = 0;
                    if (yPosition <= 0) {
                        opacity = 1;
                    } else {
                        // Fade in cuando se acerca al centro desde abajo
                        opacity = gsap.utils.interpolate(0, 1, (60 - yPosition) / 20);
                    }
                    
                    gsap.set('.crossContamination-title', {
                        y: `${yPosition}vh`,
                        opacity: opacity
                    });
                } else {
                    gsap.set('.crossContamination-title', { y: '-100vh', opacity: 0 });
                }

                // Fase 2: Cloths - viene de abajo, va al centro, luego sale por arriba (25% - 75%)
                if (progress >= 0.25 && progress <= 0.75) {
                    const clothsProgress = (progress - 0.25) / 0.5;
                    const yPosition = gsap.utils.interpolate(100, -100, clothsProgress);
                    
                    // Opacidad = 1 cuando está en 20vh (20% del bottom)
                    let opacity = 0;
                    if (yPosition <= 20) {
                        opacity = 1;
                    } else {
                        // Fade in cuando se acerca al 20vh
                        opacity = gsap.utils.interpolate(0, 1, (100 - yPosition) / 80);
                    }
                    
                    gsap.set('.crossContamination-cloths', {
                        y: `${yPosition}vh`,
                        opacity: opacity
                    });
                } else if (progress < 0.25) {
                    gsap.set('.crossContamination-cloths', { y: '100vh', opacity: 0 });
                } else {
                    gsap.set('.crossContamination-cloths', { y: '-100vh', opacity: 0 });
                }

                // Fase 3: Mops - viene de abajo, va al centro, luego sale por arriba (50% - 100%)
                if (progress >= 0.5) {
                    const mopsProgress = (progress - 0.5) / 0.5;
                    const yPosition = gsap.utils.interpolate(100, -100, mopsProgress);
                    
                    // Opacidad = 1 cuando está en 20vh (20% del bottom)
                    let opacity = 0;
                    if (yPosition <= 20) {
                        opacity = 1;
                    } else {
                        // Fade in cuando se acerca al 20vh
                        opacity = gsap.utils.interpolate(0, 1, (100 - yPosition) / 80);
                    }
                    
                    gsap.set('.crossContamination-mops', {
                        y: `${yPosition}vh`,
                        opacity: opacity
                    });
                } else {
                    gsap.set('.crossContamination-mops', { y: '100vh', opacity: 0 });
                }
            }
        });

    }, []);

    return (
        <>
            <section className="crossContaminationTrigger w-full h-screen bg-[url('/assets/images/bg-cross.jpg')] bg-cover bg-center text-white relative">
                <div className="crossContamination-overlay w-full h-full bg-gbm-blue/80 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center text-center relative">
                        <div className="crossContamination-title w-full lg:w-3/5 text-center mx-auto absolute inset-x-0">
                            <div className="mb-10">
                                <h2 className="text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-5">AT GLARING WE TAKE CARE OF YOU FROM CROSS CONTAMINATION</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                THIS WHY WE IMPLEMENT THESE SYSTEMS FOR YOU
                            </p>
                        </div>

                        <div className="crossContamination-cloths w-full flex flex-wrap justify-center gap-10 absolute inset-x-0">
                            <h3 className='w-full text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent'>DIFFERENT CLOTHS COLOR</h3>
                            <img src="/assets/images/cloths.png" alt="" />
                        </div>

                        <div className="crossContamination-mops w-full flex flex-wrap justify-center gap-10 absolute inset-x-0">
                            <h3 className='w-full text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent'>DIFFERENT MOPS</h3>
                            <img src="/assets/images/mops.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}