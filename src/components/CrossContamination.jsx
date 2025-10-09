import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function CrossContamination () {
    useGSAP (() => {
        // Configuración inicial - todos empiezan desde el bottom del viewport
        gsap.set('.crossContamination-title', { y: '100vh', opacity: 0 });
        gsap.set('.crossContamination-cloths', { y: '100vh', opacity: 0 });
        gsap.set('.crossContamination-mops', { y: '100vh', opacity: 0 });

        // ScrollTrigger para la sección
        createOptimizedScrollTrigger({
            trigger: '.crossContaminationTrigger',
            start: 'top top',
            end: '+=6000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Fase 1: Title - viaja desde bottom hasta top y se detiene arriba (0% - 25%)
                if (progress <= 0.25) {
                    const titleProgress = progress / 0.25;
                    const yPosition = gsap.utils.interpolate(100, -20, titleProgress);
                    
                    // Opacidad máxima cuando está en el centro (0vh)
                    let opacity = 0;
                    if (yPosition >= -20 && yPosition <= 20) {
                        opacity = 1;
                    } else if (yPosition > 20) {
                        // Fade in cuando sube desde abajo
                        opacity = gsap.utils.interpolate(0, 1, (100 - yPosition) / 80);
                    }
                    
                    gsap.set('.crossContamination-title', {
                        y: `${yPosition}vh`,
                        opacity: opacity
                    });
                } else {
                    // Se queda arriba fijo después del 25%
                    gsap.set('.crossContamination-title', { y: '-20vh', opacity: 1 });
                }

                // Fase 2: Cloths - viaja desde bottom hasta center, luego hasta top (30% - 70%)
                if (progress >= 0.3 && progress <= 0.7) {
                    const clothsProgress = (progress - 0.3) / 0.4;
                    const yPosition = gsap.utils.interpolate(100, -100, clothsProgress);
                    
                    // Opacidad máxima cuando está en el centro
                    let opacity = 0;
                    if (yPosition >= -20 && yPosition <= 20) {
                        opacity = 1;
                    } else if (yPosition > 20) {
                        // Fade in cuando sube desde abajo
                        opacity = gsap.utils.interpolate(0, 1, (100 - yPosition) / 80);
                    } else {
                        // Fade out cuando sale por arriba
                        opacity = gsap.utils.interpolate(1, 0, Math.abs(yPosition + 20) / 80);
                    }
                    
                    gsap.set('.crossContamination-cloths', {
                        y: `${yPosition}vh`,
                        opacity: opacity
                    });
                } else if (progress < 0.3) {
                    gsap.set('.crossContamination-cloths', { y: '100vh', opacity: 0 });
                } else {
                    gsap.set('.crossContamination-cloths', { y: '-100vh', opacity: 0 });
                }

                // Fase 3: Mops - viaja desde bottom hasta center, luego hasta top (60% - 100%)
                if (progress >= 0.6) {
                    const mopsProgress = (progress - 0.6) / 0.4;
                    const yPosition = gsap.utils.interpolate(100, -100, mopsProgress);
                    
                    // Opacidad máxima cuando está en el centro
                    let opacity = 0;
                    if (yPosition >= -20 && yPosition <= 20) {
                        opacity = 1;
                    } else if (yPosition > 20) {
                        // Fade in cuando sube desde abajo
                        opacity = gsap.utils.interpolate(0, 1, (100 - yPosition) / 80);
                    } else {
                        // Fade out cuando sale por arriba
                        opacity = gsap.utils.interpolate(1, 0, Math.abs(yPosition + 20) / 80);
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
            <section id="cross-contamination" className="crossContaminationTrigger w-full h-screen bg-[url('/assets/images/bg-cross.jpg')] bg-cover bg-center text-white relative">
                <div className="crossContamination-overlay w-full h-full bg-gbm-blue/80 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center text-center relative">
                        <div className="crossContamination-title w-full lg:w-3/5 text-center mx-auto absolute inset-x-0">
                            <div className="mb-10">
                                <h2 className="text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">EN GLARING TE CUIDAMOS DE LA CONTAMINACIÓN CRUZADA</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                POR ESO IMPLEMENTAMOS ESTOS SISTEMAS PARA TI
                            </p>
                        </div>

                        <div className="crossContamination-cloths w-full flex flex-wrap justify-center gap-10 absolute inset-x-0">
                            <h3 className='w-full text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#FFFFFF] to-gbm-green bg-clip-text text-transparent mb-8'>DIFERENTES COLORES DE PAÑOS</h3>
                            <div className="grid grid-cols-4 gap-8 w-full max-w-7xl px-8">
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-blue.jpeg" alt="Microfiber Blue" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">CRISTALES</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-green.jpeg" alt="Microfiber Green" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">POLVO Y TRABAJO PESADO</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-yellow.jpeg" alt="Microfiber Yellow" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">COCINETAS Y CAFETERÍAS</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-pink.jpeg" alt="Microfiber Pink" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">MOSTRADORES, DISPENSADORES Y LAVAMANOS DE BAÑOS</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-white.jpeg" alt="Microfiber White" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">INODOROS Y URINARIOS</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-orange.jpeg" alt="Microfiber Orange" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">ACERO INOXIDABLE</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/microfiber-cleaning-clot-black.jpeg" alt="Microfiber Black" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">GRANITO Y PIEDRA</h4>
                                </div>
                            </div>
                        </div>

                        <div className="crossContamination-mops w-full flex flex-wrap justify-center gap-10 absolute inset-x-0">
                            <h3 className='w-full text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#FFFFFF] to-gbm-green bg-clip-text text-transparent mb-8'>DIFERENTES MOPAS</h3>
                            <div className="w-full grid grid-cols-3 gap-12 max-w-4xl px-8">
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/mop-bathrooms.jpeg" alt="Mop for Bathrooms" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">BAÑOS</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/mop-heavy-duty-areas.jpeg" alt="Mop for Heavy Duty Areas" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">ÁREAS DE TRABAJO PESADO</h4>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Image src="/assets/images/mop-general-use.jpeg" alt="Mop for General Use" width={200} height={150} className="w-full h-78 object-cover rounded-lg mb-2" sizes="200px" />
                                    <h4 className="text-xl bg-gradient-to-r from-[#fff] to-gbm-green bg-clip-text text-transparent font-semibold">USO GENERAL</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}