import React, { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ChooseUs () {

    useGSAP(() => {
        // Configuración inicial - elementos ocultos abajo
        gsap.set('.chooseUs-list', { y: '100vh' });

        // ScrollTrigger con pin para fijar la sección y animar elementos
        ScrollTrigger.create({
            trigger: '.chooseUsTrigger',
            start: 'top top',
            end: '+=6000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación continua de los cards - siguen subiendo durante todo el scroll
                gsap.set('.chooseUs-list', {
                    y: gsap.utils.interpolate('100vh', '-100vh', progress)
                });

            }
        });

    }, []);

    return (
        <>
            <section className="chooseUsTrigger w-full h-screen bg-[url('/assets/images/bg-van.jpg')] bg-cover bg-center text-white relative">
                <div className="chooseUs-overlay w-full h-screen bg-gbm-blue/70 absolute inset-0 py-4 md:py-20">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">

                        <div className="chooseUs-list w-full h-screen flex flex-wrap items-center px-4 md:px-8 lg:px-20 relative">
                            <div className="chooseUs-section w-full lg:w-3/5 text-center mx-auto">
                                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-5">WHY CHOOSE US</h2>
                                <div className="w-32 sm:w-40 md:w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>

                            <div className="imagesSection w-full sm:w-11/12 md:w-5/6 lg:w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-2 md:px-4 lg:px-8 mt-8 md:mt-12 lg:mt-20">
                                {/* Primera columna */}
                                <div className="flex flex-col gap-8">
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <img 
                                            src="/assets/images/Choose-Partnership.png" 
                                            alt="Partnership" 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">PARTNERSHIP</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                Over 75% of our existing business comes to us through referrals. If it's important to our clients, it's important to us.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <img 
                                            src="/assets/images/Choose-Always-Ready.jpg" 
                                            alt="Always Ready" 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">ALWAYS READY</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                Since we serve facilities and building just like yours, we have the equipment and personnel ready to deal with any contingency and provide continuity of service.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <img 
                                            src="/assets/images/Choose-Emergency.jpg" 
                                            alt="Emergency" 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">EMERGENCY</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                When disaster strikes, every minute counts. Glaring Building Maintenance guarantee rapid and proven response and workable solutions to any unexpected situation.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Segunda columna */}
                                <div className="flex flex-col gap-8">
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <img 
                                            src="/assets/images/Choose-Consistent-Quality.jpg" 
                                            alt="Consistent Quality" 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">CONSISTENT QUALITY</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                Consistency and Quality are the pillars of our service standards.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <img 
                                            src="/assets/images/Choose-commitment.jpg" 
                                            alt="Commitment" 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">COMMITMENT</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                We promise quality, reliable Janitorial Services every time so our loyal customers feel special. We work hard to be the best.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="chooseItem flex justify-end flex-col relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[32rem]">
                                        <img 
                                            src="/assets/images/Choose-Experience.jpg" 
                                            alt="Experience" 
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="w-[90%] mx-auto bg-gbm-blue/60 relative z-10 p-3 sm:p-4 md:p-6 flex flex-col justify-end mb-3 sm:mb-4 md:mb-5 rounded-2xl">
                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">EXPERIENCE</h3>
                                            <p className="text-sm sm:text-base leading-relaxed text-center opacity-90 text-white">
                                                Over the years we worked hard at not just solving existing problems for our clients, We've learned how to predict and prevent most recurring challenges.
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