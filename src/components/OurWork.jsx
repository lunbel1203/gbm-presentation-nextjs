import React, { useRef } from 'react'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function MisionVision () {
    useGSAP (() => {
        // Configuración inicial: ocultar todas las secciones de contenido
        gsap.set('.ourWork-section', { opacity: 0, y: 50 });

        // ScrollTrigger para ourWork
        createOptimizedScrollTrigger({
            trigger: '.ourWorkTrigger',
            start: 'top top',
            end: '+=1000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log('ourWork progress:', progress);
                
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
                
                gsap.set('.ourWork-section', { opacity: opacity, y: yPosition });
            }
        });

    }, []);


    return (
        <>
            <section id="ourWork" className="ourWorkTrigger w-full h-screen bg-[url('/assets/images/our-work.jpg')] bg-cover bg-center text-white relative">
                <div className="ourWork-overlay w-full h-full bg-gbm-blue/30 absolute inset-0">
                    <div className="container h-full mx-auto flex flex-wrap justify-center items-center text-center">
                        <div className="ourWork-section w-full lg:w-3/5 text-center mx-auto">
                            <div className="mb-10">
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">Our Work Speaks for Itself</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}