import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function Equipment () {
    
    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Configuración inicial
        gsap.set('.equipment-overlay', { opacity: 0 });
        gsap.set('.equipment-section', { y: '100vh', opacity: 0 });

        // ScrollTrigger para equipment
        createOptimizedScrollTrigger({
            trigger: '.equipmentTrigger',
            start: 'top top',
            end: '+=2000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Fase 1: Equipment overlay opacity va de 0 a 0.6 (0% - 50%)
                if (progress <= 0.5) {
                    const overlayProgress = progress / 0.5;
                    gsap.set('.equipment-overlay', {
                        opacity: gsap.utils.interpolate(0, 0.6, overlayProgress)
                    });
                } else {
                    gsap.set('.equipment-overlay', { opacity: 0.6 });
                }
                
                // Fase 2: Equipment section sube desde abajo (50% - 100%)
                if (progress >= 0.5) {
                    const sectionProgress = (progress - 0.5) / 0.5;
                    const yPosition = gsap.utils.interpolate(100, 0, sectionProgress);
                    gsap.set('.equipment-section', {
                        y: `${yPosition}vh`,
                        opacity: gsap.utils.interpolate(0, 1, sectionProgress)
                    });
                } else {
                    gsap.set('.equipment-section', { y: '100vh', opacity: 0 });
                }
            }
        });

    }, []);

    return (
        <>
            <section id="equipment" className="equipmentTrigger w-full h-screen bg-[url('/assets/images/bg-equipment.jpeg')] bg-cover bg-center text-white relative">
                <div className="equipment-overlay w-full h-full bg-gbm-blue/90 fixed inset-0"></div>
                <div className="equipment-section w-3/4 h-full mx-auto flex justify-center items-center text-center">
                    <div className="relative w-68 h-96 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/assets/images/equipment-img.jpg"
                            alt="Equipment Image"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full lg:w-3/5 text-left mx-auto">
                        <div className="mb-10">
                            <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">Equipment</h2>
                            <div className="w-52 h-1 bg-gbm-green"></div>
                        </div>
                        <p className="text-base lg:text-xl mx-auto font-bold leading-relaxed bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent">
                            Our commitment to excellence begins with the tools we provide our team. We invest in the latest, most reliable equipment in the industry, allowing us to deliver consistently superior results. With state-of-the-art technology (SOTA), we ensure efficiency, safety, and the highest standards of quality in every service we perform.
                        </p>
                    </div>
                </div>
            </section>

        </>
    )
}