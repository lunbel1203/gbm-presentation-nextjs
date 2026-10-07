import React from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function ThankYou() {
    
    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Animacion simple y elegante para la pagina de agradecimiento
        gsap.fromTo('.thank-you-logo', 
            {
                scale: 0.5,
                opacity: 0,
                y: 50
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.thankYouTrigger',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.thank-you-text', 
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.thankYouTrigger',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    return (
        <>
            <section id="thank-you" className="thankYouTrigger w-full min-h-screen bg-white flex flex-col justify-center items-center py-20">
                <div className="thank-you-container max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    
                    {/* Logo */}
                    <div className="thank-you-logo mb-16">
                        <Image
                            src="/assets/images/logo-normal.png"
                            alt="Glaring Building Maintenance"
                            width={400}
                            height={256}
                            className="w-auto h-48 lg:h-64 mx-auto object-contain"
                        />
                    </div>

                    {/* Thank You Message */}
                    <div className="thank-you-text">
                        <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase tracking-wide mb-8">
                            Hablemos de Su Propiedad.
                        </h1>
                        <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed mb-8">
                            Ya sea que busque un mejor programa de limpieza, servicios especializados para instalaciones o un solo socio capaz de hacer más, estamos listos para ayudarle.
                        </p>
                        <a
                            href="https://glaringmaintenance.com.do/get-estimate"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-[#194263] to-gbm-green text-white text-lg lg:text-xl font-black uppercase tracking-wide shadow-lg hover:shadow-xl transition-shadow duration-300 mb-10"
                        >
                            Programe una Evaluación de su Instalación
                        </a>
                        <p className="text-xl lg:text-3xl font-black text-[#194263]">Su Propiedad Es Nuestra Prioridad.</p>
                        <p className="text-xl lg:text-3xl font-black text-gbm-green">La Diferencia Es Glaring.</p>
                    </div>

                </div>
            </section>
        </>
    )
}