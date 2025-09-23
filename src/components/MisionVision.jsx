import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MisionVision () {
    useGSAP (() => {
        // Configuración inicial: ocultar todas las secciones de contenido
        gsap.set('.mission-section', { opacity: 0, y: 50 });
        gsap.set('.vision-section', { opacity: 0, y: 50 });
        gsap.set('.values-section', { opacity: 0, y: 50 });

        // ScrollTrigger para MISSION
        ScrollTrigger.create({
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
        ScrollTrigger.create({
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
        ScrollTrigger.create({
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
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-5">MISSION</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                Achieve 100% customer satisfaction, so that they can focus on their own company’s mission and they can achieve their own success. Even quicker. All while keeping our employees satisfied, always seeking excellence and making continuous improvements to our services.
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
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-5">VISION</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                To be recognized as the leading company in the provision of cleaning solutions for the quality of our services and commintment to our customers.
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
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-5">VALUES</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <div className="w-full flex justify-center">
                                <ul className='w-full lg:w-1/2 flex flex-wrap gap-5 text-2xl text-left'>
                                    <li><span className='text-gbm-green font-bold'>Honesty:</span> We like and believe in honesty as one of the fundamental pillars that govern all the activities of any company, and we behave and express ourselves with coherence and sincerity in accordance with the values of truth and justice.</li>
                                    <li><span className='text-gbm-green font-bold'>Commitment:</span> We highlight the value of the commitment of each member of the company with their assumed responsibilities, we believe in the work of each individual and in their value within the company.</li>
                                    <li><span className='text-gbm-green font-bold'>Responsibility:</span> We know the responsibility of our actions (and omissions). This is why we assume the responsibility of ensuring a healthy environment for our clients, being responsible also with the environment.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}