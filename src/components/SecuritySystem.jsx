import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { useGSAP } from '@gsap/react'

export default function SecuritySystem () {
    const [lightboxImage, setLightboxImage] = useState(null);
    const [clickedImageSrc, setClickedImageSrc] = useState(null);
    const [isClient, setIsClient] = useState(false);

    const openLightbox = (imageSrc, event) => {
        event.stopPropagation();
        setClickedImageSrc(imageSrc);
        setLightboxImage(imageSrc);
    }

    const closeLightbox = () => {
        setLightboxImage(null);
        setClickedImageSrc(null);
    }

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    useGSAP(() => {
        if (!isClient) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.securitySystem-section',
                start: 'top top',
                end: '+=200%',
                pin: true,
                scrub: 1
            }
        });

        // Fade in del título con movimiento suave
        tl.fromTo('.security-title-container',
            { opacity: 0, y: 80, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
        )
        // Sube el container desde abajo con animación más fluida
        .fromTo('.securitySystem-container',
            { y: window.innerHeight, opacity: 0 },
            { y: -300, opacity: 1, duration: 1.2, ease: 'power3.inOut' },
            '-=0.5'
        )
        // Anima cada item individualmente
        .from('.security-item', {
            y: 50,
            stagger: 0.1,
            duration: 0.5,
            ease: 'back.out(1.2)'
        }, '-=0.3');
    }, [isClient]);

    return (
        <>
            <section id="security-system" className="securitySystem-section w-full h-screen flex items-center bg-slate-200 relative">

                <div className="securitySystem-overlay w-full flex items-center px-8 lg:px-20">

                    {/* Título de la sección */}
                    <div className="security-title-container w-[40%] text-left mb-16" style={{opacity: isClient ? 0 : 1}}>
                        <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4 leading-tight">SECURITY SYSTEM</h2>
                        <div className="w-24 h-1 bg-gbm-green"></div>
                    </div>

                    {/* Grid Container */}
                    <div className="securitySystem-container w-[100%] grid grid-cols-2 items-center gap-12 lg:gap-16">

                        {/* Item 1 */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 cursor-pointer">
                                <Image
                                    src="/assets/images/security-system-01.jpg"
                                    alt="Background checks & screenings"
                                    width={400}
                                    height={256}
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/security-system-01.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/security-system-01.jpg', e)}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="text-content">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Checks & Screenings</h3>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 cursor-pointer">
                                <Image
                                    src="/assets/images/security-system-03.jpg"
                                    alt="Trained on client security protocols"
                                    width={400}
                                    height={256}
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/security-system-03.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/security-system-03.jpg', e)}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="text-content mb-6">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Trained on All Client Security Protocols</h3>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 cursor-pointer">
                                <Image
                                    src="/assets/images/security-system-02.jpg"
                                    alt="Uniformed staff with ID badges"
                                    width={400}
                                    height={256}
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/security-system-02.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/security-system-02.jpg', e)}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="text-content">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Uniformed Staff with ID Badges</h3>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="security-item flex flex-col items-center text-center">
                            <div className="photo-securitySystem mb-6 cursor-pointer">
                                <Image
                                    src="/assets/images/security-system-04.png"
                                    alt="Real-time location & time tracking system"
                                    width={400}
                                    height={256}
                                    className={`w-full h-64 object-cover shadow-lg border-8 border-white rounded-lg ${
                                        clickedImageSrc === '/assets/images/security-system-04.png' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/security-system-04.png', e)}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="text-content">
                                <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">Real-time Location & Time Tracking</h3>
                            </div>
                        </div>

                    </div>
                    
                </div>

            </section>

            {/* Lightbox usando Portal */}
            {lightboxImage && isClient && createPortal(
                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl max-h-[80vh] p-4">
                        <Image
                            src={lightboxImage}
                            alt="Lightbox Image"
                            width={800}
                            height={600}
                            className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border-8 border-white"
                            onClick={(e) => e.stopPropagation()}
                            sizes="80vw"
                        />
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors duration-200"
                        >
                            ×
                        </button>
                    </div>
                </div>,
                document.body
            )}

        </>
    )
}