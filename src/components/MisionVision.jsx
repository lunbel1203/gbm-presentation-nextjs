import React, { useRef } from 'react'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function MisionVision() {
    useGSAP(() => {
        // Configuración inicial: ocultar todas las secciones de contenido
        gsap.set('.mission-section', { opacity: 0, y: 50 });
        gsap.set('.vision-section', { opacity: 0, y: 50 });
        gsap.set('.values-section', { opacity: 0, y: 50 });

        // ScrollTrigger para MISSION
        createOptimizedScrollTrigger({
            trigger: '.missionTrigger',
            start: 'top top',
            end: '+=1000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('Mission progress:', progress);

                // Fade in gradual desde 10% hasta 30% del scroll
                let opacity = 0;
                let yPosition = 50;

                if (progress >= 0.1 && progress <= 0.3) {
                    const fadeProgress = (progress - 0.1) / 0.2; // De 0.1 a 0.3 = 20%
                    opacity = gsap.utils.interpolate(0, 1, fadeProgress);
                    yPosition = gsap.utils.interpolate(50, 0, fadeProgress);
                } else if (progress > 0.3) {
                    opacity = 1;
                    yPosition = 0;
                }

                gsap.set('.mission-section', { opacity: opacity, y: yPosition });
            }
        });

        // ScrollTrigger para VISION
        createOptimizedScrollTrigger({
            trigger: '.visionTrigger',
            start: 'top top',
            end: '+=1000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('Vision progress:', progress);

                // Fade in gradual desde 10% hasta 30% del scroll
                let opacity = 0;
                let yPosition = 50;

                if (progress >= 0.1 && progress <= 0.3) {
                    const fadeProgress = (progress - 0.1) / 0.2;
                    opacity = gsap.utils.interpolate(0, 1, fadeProgress);
                    yPosition = gsap.utils.interpolate(50, 0, fadeProgress);
                } else if (progress > 0.3) {
                    opacity = 1;
                    yPosition = 0;
                }

                gsap.set('.vision-section', { opacity: opacity, y: yPosition });
            }
        });

        // ScrollTrigger para VALUES
        createOptimizedScrollTrigger({
            trigger: '.valuesTrigger',
            start: 'top top',
            end: '+=1000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('Values progress:', progress);

                // Fade in gradual desde 10% hasta 30% del scroll
                let opacity = 0;
                let yPosition = 50;

                if (progress >= 0.1 && progress <= 0.3) {
                    const fadeProgress = (progress - 0.1) / 0.2;
                    opacity = gsap.utils.interpolate(0, 1, fadeProgress);
                    yPosition = gsap.utils.interpolate(50, 0, fadeProgress);
                } else if (progress > 0.3) {
                    opacity = 1;
                    yPosition = 0;
                }

                gsap.set('.values-section', { opacity: opacity, y: yPosition });
            }
        });

    }, []);


    return (
        <>
            <section id="mission" className="missionTrigger w-full h-screen bg-[url('/assets/images/bg-mission.jpg')] bg-cover bg-center text-white relative">
                <div className="mission-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="mission-section w-full lg:w-3/5 text-center mx-auto">
                            <div className="mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">MISSION</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                To make facility management simpler by delivering reliable, high-quality services that allow our clients to focus on what they do best.
                            </p>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold mt-6">
                                We pursue continuous improvement while creating an environment where our clients, employees, and communities can succeed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="vision" className="visionTrigger w-full h-screen bg-[url('/assets/images/bg-vision.jpg')] bg-cover bg-center text-white relative">
                <div className="mission-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="vision-section w-full lg:w-3/5 text-center mx-auto">
                            <div className="mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">VISION</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                To set a higher standard for facility care across every market we serve, becoming the trusted partner organizations rely on for quality, innovation, accountability, and long-term results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="values" className="valuesTrigger w-full h-screen bg-[url('/assets/images/bg-values.jpg')] bg-cover bg-center text-white relative">
                <div className="mission-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="values-section w-full lg:w-4/5 text-center mx-auto">
                            <div className="w-full mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">VALUES</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <div className="w-full flex justify-center">
                                <ul className='w-full lg:w-4/5 grid grid-cols-2 gap-x-12 gap-y-10 text-left'>
                                    <li><h3 className='text-gbm-green font-bold uppercase text-3xl mb-2'>Honesty</h3><p className='text-xl text-gray-200'>We communicate openly, act with integrity, and do what's right even when no one is watching.</p></li>
                                    <li><h3 className='text-gbm-green font-bold uppercase text-3xl mb-2'>Commitment</h3><p className='text-xl text-gray-200'>We take ownership of our work and hold ourselves accountable for the results.</p></li>
                                    <li><h3 className='text-gbm-green font-bold uppercase text-3xl mb-2'>Responsibility</h3><p className='text-xl text-gray-200'>We care for our clients' properties as if they were our own, with safety and professionalism at the center of every decision.</p></li>
                                    <li><h3 className='text-gbm-green font-bold uppercase text-3xl mb-2'>Innovation</h3><p className='text-xl text-gray-200'>We continuously improve our equipment, technology, processes, and training to deliver better facility solutions.</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}