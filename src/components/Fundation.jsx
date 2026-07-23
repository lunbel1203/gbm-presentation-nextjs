import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function Fundation () {

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Configuración inicial - todos los elementos ocultos
        gsap.set('.fundation-paragraph', { opacity: 0 });
        gsap.set('.fundation-logo', { opacity: 0 });
        gsap.set('.content-fundation', { opacity: 0 });
        gsap.set('.coming-soon', { opacity: 0 });

        // ScrollTrigger para la secuencia de animación
        createOptimizedScrollTrigger({
            trigger: '.fundationTrigger',
            start: 'top top',
            end: '+=3000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Fase 1: Primer párrafo aparece y desaparece (0% - 25%)
                if (progress <= 0.25) {
                    const paragraphProgress = progress / 0.25;
                    if (paragraphProgress <= 0.5) {
                        // Fade in (0% - 12.5%)
                        gsap.set('.fundation-paragraph', {
                            opacity: gsap.utils.interpolate(0, 1, paragraphProgress * 2)
                        });
                    } else {
                        // Fade out (12.5% - 25%)
                        gsap.set('.fundation-paragraph', {
                            opacity: gsap.utils.interpolate(1, 0, (paragraphProgress - 0.5) * 2)
                        });
                    }
                } else {
                    gsap.set('.fundation-paragraph', { opacity: 0 });
                }

                // Fase 2: Logo aparece (25% - 50%)
                if (progress >= 0.25 && progress <= 0.5) {
                    const logoProgress = (progress - 0.25) / 0.25;
                    gsap.set('.fundation-logo', {
                        opacity: gsap.utils.interpolate(0, 1, logoProgress)
                    });
                } else if (progress < 0.25) {
                    gsap.set('.fundation-logo', { opacity: 0 });
                } else {
                    gsap.set('.fundation-logo', { opacity: 1 });
                }

                // Fase 3: Content-fundation aparece y desaparece (50% - 75%)
                if (progress >= 0.5 && progress <= 0.75) {
                    const contentProgress = (progress - 0.5) / 0.25;
                    if (contentProgress <= 0.7) {
                        // Aparece y se mantiene (50% - 67.5%)
                        gsap.set('.content-fundation', {
                            opacity: gsap.utils.interpolate(0, 1, contentProgress / 0.7),
                            display: 'block'
                        });
                        gsap.set('.coming-soon', { display: 'none' });
                    } else {
                        // Desaparece (67.5% - 75%)
                        gsap.set('.content-fundation', {
                            opacity: gsap.utils.interpolate(1, 0, (contentProgress - 0.7) / 0.3),
                            display: 'block'
                        });
                        gsap.set('.coming-soon', { display: 'none' });
                    }
                } else {
                    gsap.set('.content-fundation', { opacity: 0, display: 'none' });
                }

                // Fase 4: Coming-soon aparece (75% - 100%)
                if (progress >= 0.75) {
                    const comingSoonProgress = (progress - 0.75) / 0.25;
                    gsap.set('.coming-soon', {
                        opacity: gsap.utils.interpolate(0, 1, comingSoonProgress),
                        display: 'block'
                    });
                    gsap.set('.content-fundation', { display: 'none' });
                } else {
                    gsap.set('.coming-soon', { opacity: 0, display: 'none' });
                }
            }
        });

    }, []);

    return (
        <>
            <section id="fundation" className="fundationTrigger w-full h-screen flex flex-col justify-center items-center text-white relative px-8">

                {/* Logo - aparece y se mantiene */}
                <Image
                    src="/assets/images/logo-glaring-cares.png"
                    alt="Glaring Care"
                    width={600}
                    height={300}
                    className='fundation-logo w-[600px] h-auto mb-10 object-contain'
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 600px"
                />

                {/* Content fundation - aparece debajo del logo */}
                <div className="content-fundation max-w-4xl text-center">
                    <p className="text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-semibold mb-6">
                        Founded in the United States in 2025 and expanded to the Dominican Republic in 2026, Glaring Cares Foundation is dedicated to supporting local communities, helping families, and creating opportunities that make a lasting difference.
                    </p>

                    <p className="text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-semibold">
                        Glaring Cares Foundation is more than a nonprofit organization. It reflects our commitment to giving back, serving others, and building stronger communities wherever we work.
                    </p>
                </div>

                {/* Coming soon - reemplaza al content */}
                <div className="coming-soon text-center mt-2">
                    <h3 className='text-6xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-semibold mb-4'>Now Serving the Dominican Republic: In 2026, Glaring Cares Foundation proudly expanded its mission to the Dominican Republic.</h3>
                    <p className='text-8xl'>🇩🇴</p>
                </div>

            </section>
        </>
    )
}