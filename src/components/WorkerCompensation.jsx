import React, { useState } from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function WorkerCompensation () {
    const [lightboxImage, setLightboxImage] = useState(null);
    const [originPosition, setOriginPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [clickedImageSrc, setClickedImageSrc] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const openLightbox = (imageSrc, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOriginPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height
        });
        setClickedImageSrc(imageSrc);
        setLightboxImage(imageSrc);
        setIsClosing(false);
    }

    const closeLightbox = () => {
        setIsClosing(true);
        // Esperar a que termine completamente la animación
        setTimeout(() => {
            setLightboxImage(null);
            setClickedImageSrc(null);
            setIsClosing(false);
        }, 500); // Duración completa de la animación
    }

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Configuración inicial
        gsap.set('.compensation-title-container', { y: 200, opacity: 0 });
        gsap.set('.photo-compensation', { y: 1000 });

        // ScrollTrigger para la sección
        createOptimizedScrollTrigger({
            trigger: '.compensation-section',
            start: 'top top',
            end: '+=3000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación del título (0% - 30%)
                if (progress <= 0.3) {
                    const titleProgress = progress / 0.3;
                    gsap.set('.compensation-title-container', {
                        y: gsap.utils.interpolate(200, 0, titleProgress),
                        opacity: gsap.utils.interpolate(0, 1, titleProgress),
                        transform: `translateY(${gsap.utils.interpolate(200, 0, titleProgress)}px)`
                    });
                } else {
                    gsap.set('.compensation-title-container', {
                        y: 0,
                        opacity: 1,
                        transform: 'translateY(0px)'
                    });
                }

                // Animación de las fotos (30% - 60%)
                if (progress >= 0.2 && progress <= 0.6) {
                    const imagesProgress = (progress - 0.3) / 0.3;
                    gsap.set('.photo-compensation', {
                        y: gsap.utils.interpolate(1000, 0, imagesProgress)
                    });
                } else if (progress > 0.2) {
                    // Fotos se quedan visibles después del 60%
                    gsap.set('.photo-compensation', {
                        y: 0
                    });
                }
            }
        });

    }, []);

    return (
        <>
            <section id="worker-compensation" className="compensation-section w-full h-screen relative">
                <div className="compensation-overlay w-full flex items-center px-20 bg-white absolute inset-0">
                    <div className="imagesSection w-[60%] flex flex-wrap items-center gap-6">
                        <div className="photo-compensation w-[calc(100%/2-150px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <Image
                                src="/assets/images/working-compensation-01.jpg"
                                alt="Worker Compensation 1"
                                width={300}
                                height={400}
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/working-compensation-01.jpg' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/working-compensation-01.jpg', e)}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                        <div className="leftColumn w-[calc(100%/2-150px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <div className="photo-compensation w-full transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image
                                    src="/assets/images/working-compensation-02.jpg"
                                    alt="Worker Compensation 2"
                                    width={300}
                                    height={400}
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                        clickedImageSrc === '/assets/images/working-compensation-02.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/working-compensation-02.jpg', e)}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                        </div>
                        <div className="leftColumn w-[calc(100%/2-150px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <div className="photo-compensation w-full transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image
                                    src="/assets/images/working-compensation-03.jpg"
                                    alt="Worker Compensation 3"
                                    width={300}
                                    height={400}
                                    className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                        clickedImageSrc === '/assets/images/working-compensation-03.jpg' ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    onClick={(e) => openLightbox('/assets/images/working-compensation-03.jpg', e)}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                        </div>
                        <div className="photo-compensation w-[calc(100%/2-150px)] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-300 col-span-2 cursor-pointer">
                            <Image
                                src="/assets/images/working-compensation-04.jpg"
                                alt="Worker Compensation 4"
                                width={300}
                                height={400}
                                className={`w-full h-auto object-cover shadow-lg border-8 border-white ${
                                    clickedImageSrc === '/assets/images/working-compensation-04.jpg' ? 'opacity-0' : 'opacity-100'
                                }`}
                                onClick={(e) => openLightbox('/assets/images/working-compensation-04.jpg', e)}
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    </div>
                    <div className="compensation-title-container w-[40%] text-left">
                        <h2 className="w-full text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-10">WORKERS COMPENSATION</h2>
                        <h3 className="w-full text-4xl font-bold text-gbm-green mb-10">All workers are budgeted based on a living wage.</h3>
                        <div className="w-24 h-1 bg-gbm-green mb-10"></div>
                        <h3 className='text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent'>(This represents 20-30% above Massachusetts state minimum wage) Cleaning worker turnover rate: 20% annually (Industry average = 200%)</h3>
                    </div>
                </div>

                {/* Lightbox */}
                {lightboxImage && (
                    <div 
                        className={`fixed inset-0 bg-black/95 bg-opacity-60 flex items-center justify-center z-50 cursor-pointer ${
                            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
                        }`}
                        onClick={closeLightbox}
                    >
                        <div 
                            className={`relative max-w-4xl max-h-[80vh] p-4 ${
                                isClosing ? 'animate-collapseToOrigin' : 'animate-expandFromOrigin'
                            }`}
                            style={{
                                '--origin-x': `${originPosition.x}px`,
                                '--origin-y': `${originPosition.y}px`,
                                '--origin-width': `${originPosition.width}px`,
                                '--origin-height': `${originPosition.height}px`
                            }}
                        >
                            <Image
                                src={lightboxImage}
                                alt="Lightbox Image"
                                width={800}
                                height={600}
                                className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border-8 border-white transition-transform duration-300"
                                sizes="80vw"
                            />
                            <button 
                                onClick={closeLightbox}
                                className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold hover:bg-gray-200 transition-colors duration-200"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </section>
            
            {/* Estilos CSS para las animaciones */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
                
                @keyframes expandFromOrigin {
                    0% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.01);
                        opacity: 0;
                    }
                    30% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.3);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes collapseToOrigin {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    70% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.3);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(
                            calc(var(--origin-x) - 50vw), 
                            calc(var(--origin-y) - 50vh)
                        ) scale(0.01);
                        opacity: 0;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                
                .animate-fadeOut {
                    animation: fadeOut 0.5s ease-out;
                }
                
                .animate-expandFromOrigin {
                    animation: expandFromOrigin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-collapseToOrigin {
                    animation: collapseToOrigin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>
        </>
    )
}