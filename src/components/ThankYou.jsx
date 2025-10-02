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
                        <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase tracking-wide">
                            Thank You for your time.
                        </h1>
                    </div>

                </div>
            </section>
        </>
    )
}