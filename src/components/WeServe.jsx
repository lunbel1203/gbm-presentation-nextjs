import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WeServe () {
    useGSAP (() => {
        // Configuración inicial: ocultar todas las secciones de contenido
        gsap.set('.weServe-section', { opacity: 0, y: 50 });
        gsap.set('.massachusetts-section', { opacity: 0, y: 50 });
        gsap.set('.hampshire-section', { opacity: 0, y: 50 });
        gsap.set('.maine-section', { opacity: 0, y: 50 });
        gsap.set('.republicaDominicana-section', { opacity: 0, y: 50 });

        // ScrollTrigger para weServe
        ScrollTrigger.create({
            trigger: '.weServeTrigger',
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('weServe progress:', progress);
                
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
                
                gsap.set('.weServe-section', { opacity: opacity, y: yPosition });
            }
        });

        // ScrollTrigger para massachusetts
        ScrollTrigger.create({
            trigger: '.massachusettsTrigger',
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('massachusetts progress:', progress);
                
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
                
                gsap.set('.massachusetts-section', { opacity: opacity, y: yPosition });
            }
        });

        // ScrollTrigger para hampshire
        ScrollTrigger.create({
            trigger: '.hampshireTrigger',
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('hampshire progress:', progress);
                
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
                
                gsap.set('.hampshire-section', { opacity: opacity, y: yPosition });
            }
        });

        // ScrollTrigger para hampshire
        ScrollTrigger.create({
            trigger: '.maineTrigger',
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('maine progress:', progress);
                
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
                
                gsap.set('.maine-section', { opacity: opacity, y: yPosition });
            }
        });

        // ScrollTrigger para hampshire
        ScrollTrigger.create({
            trigger: '.republicaDominicanaTrigger',
            start: 'top top',
            end: '+=1500',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('republicaDominicana progress:', progress);
                
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
                
                gsap.set('.republicaDominicana-section', { opacity: opacity, y: yPosition });
            }
        });

    }, []);


    return (
        <>
            <section id="we-serve" className="weServeTrigger w-full h-screen bg-[url('/assets/images/bg-weServe.jpg')] bg-cover bg-center text-white relative">
                <div className="weServe-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="weServe-section w-full lg:w-4/5 text-center mx-auto">
                            <div className="w-full mb-10">
                                <h2 className="w-full text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">WE PROUDLY SERVE</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="w-full lg:w-3/5 text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                From New England to the Dominican Republic, we deliver reliable maintenance services that keep your facilities at their best.                            
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="massachusettsTrigger w-full h-screen bg-[url('/assets/images/bg-massachusetts.jpg')] bg-cover bg-center text-white relative">
                <div className="weServe-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="massachusetts-section w-full lg:w-3/5 text-center mx-auto">
                            <div className="mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">Massachusetts</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hampshireTrigger w-full h-screen bg-[url('/assets/images/bg-new-hampshire.jpg')] bg-cover bg-center text-white relative">
                <div className="weServe-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="hampshire-section w-full lg:w-4/5 text-center mx-auto">
                            <div className="w-full mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">New Hampshire</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="maineTrigger w-full h-screen bg-[url('/assets/images/bg-maine.jpg')] bg-cover bg-center text-white relative">
                <div className="weServe-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="maine-section w-full lg:w-4/5 text-center mx-auto">
                            <div className="w-full mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">Maine</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="republicaDominicanaTrigger w-full h-screen bg-[url('/assets/images/bg-republica-dominicana.jpg')] bg-cover bg-center text-white relative">
                <div className="weServe-overlay w-full h-full bg-gbm-blue/60 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="republicaDominicana-section w-full lg:w-4/5 text-center mx-auto">
                            <div className="w-full mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">Dominican Republic</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}