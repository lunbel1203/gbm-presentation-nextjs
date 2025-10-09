import React, { useState } from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function ChooseUs () {

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Configuración inicial - elementos ocultos abajo
        gsap.set('.chooseUs-list', {
            y: '100vh',
            opacity: 0
        });

        // ScrollTrigger con pin para fijar la sección y animar elementos
        createOptimizedScrollTrigger({
            trigger: '.chooseUsTrigger',
            start: 'top top',
            end: '+=2500',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación continua de los cards - suben desde abajo hasta arriba
                const yPosition = gsap.utils.interpolate(100, -100, progress);
                gsap.set('.chooseUs-list', {
                    y: `${yPosition}vh`,
                    opacity: progress > 0.1 ? 1 : 0
                });
            }
        });

    }, []);

    return (
        <>
            <section id="choose-us" className="chooseUsTrigger w-full h-screen bg-[url('/assets/images/bg-van.jpg')] bg-cover bg-center text-white relative">
                <div className="chooseUs-overlay w-full h-screen bg-gbm-blue/70 absolute inset-0 py-4 md:py-20">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">

                        <div className="chooseUs-list w-full h-screen flex flex-wrap items-center px-4 md:px-8 lg:px-20 relative">
                            <div className="chooseUs-section w-full lg:w-4/5 text-center mx-auto">
                                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">POR QUÉ ELEGIRNOS</h2>
                                <div className="w-32 sm:w-40 md:w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>

                            <div className="imagesSection w-full sm:w-11/12 md:w-5/6 lg:w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-2 md:px-4 lg:px-8 mt-8 md:mt-12 lg:mt-20">
                                {/* Primera columna */}
                                <div className="flex flex-col gap-8">
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <Image
                                            src="/assets/images/choose-partnership.png"
                                            alt="Partnership"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg lg:text-3xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">ASOCIACIÓN</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center text-white font-bold">
                                                Más del 75% de nuestro negocio actual nos llega a través de referidos. Si es importante para nuestros clientes, es importante para nosotros.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <Image
                                            src="/assets/images/choose-always-ready.jpg"
                                            alt="Always Ready"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg lg:text-3xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">SIEMPRE LISTOS</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center text-white font-bold">
                                                Ya que atendemos instalaciones y edificios como el suyo, tenemos el equipo y personal listos para lidiar con cualquier contingencia y brindar continuidad del servicio.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <Image
                                            src="/assets/images/choose-emergency.jpg"
                                            alt="Emergency"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg lg:text-3xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">EMERGENCIAS</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center text-white font-bold">
                                                Cuando ocurre un desastre, cada minuto cuenta. Glaring Building Maintenance garantiza una respuesta rápida y comprobada con soluciones viables para cualquier situación inesperada.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Segunda columna */}
                                <div className="flex flex-col gap-8">
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <Image
                                            src="/assets/images/choose-consistent-quality.jpg"
                                            alt="Consistent Quality"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg lg:text-3xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">CALIDAD CONSISTENTE</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center text-white font-bold">
                                                La consistencia y la calidad son los pilares de nuestros estándares de servicio.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <Image
                                            src="/assets/images/choose-commitment.jpg"
                                            alt="Commitment"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg lg:text-3xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">COMPROMISO</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center text-white font-bold">
                                                Prometemos servicios de limpieza de calidad y confiables cada vez para que nuestros clientes leales se sientan especiales. Trabajamos duro para ser los mejores.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <Image
                                            src="/assets/images/choose-experience.jpg"
                                            alt="Experience"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg lg:text-3xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">EXPERIENCIA</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                A lo largo de los años hemos trabajado duro no solo resolviendo problemas existentes para nuestros clientes, sino que hemos aprendido a predecir y prevenir la mayoría de los desafíos recurrentes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
            
        </>
    )
}