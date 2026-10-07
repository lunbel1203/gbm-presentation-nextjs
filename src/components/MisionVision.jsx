import React, { useRef } from 'react'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function MisionVision () {
    useGSAP (() => {
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
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">MISIÓN</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                Nuestra misión es simplificar el cuidado de las instalaciones ofreciendo soluciones confiables y de alta calidad mediante equipos propios capacitados, sistemas sólidos y un único estándar de responsabilidad, permitiendo que nuestros clientes se concentren en lo que mejor hacen.
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
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">VISIÓN</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <p className="text-base lg:text-2xl mx-auto leading-relaxed text-gray-200 font-bold">
                                Convertirnos en uno de los socios de soluciones para instalaciones más confiables en los mercados que servimos, reconocidos por la calidad, la innovación, la responsabilidad y nuestra capacidad de ofrecer múltiples servicios para propiedades bajo un mismo techo.
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
                                <h2 className="text-2xl lg:text-8xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent mb-5">VALORES</h2>
                                <div className="w-52 h-1 bg-gbm-green mx-auto"></div>
                            </div>
                            <div className="w-full flex justify-center">
                                <ul className='w-full lg:w-1/2 flex flex-wrap gap-5 text-xl text-left'>
<li><span className='text-gbm-green font-bold uppercase'>Honestidad</span> — La transparencia y la integridad guían cada decisión.</li>
                                    <li><span className='text-gbm-green font-bold uppercase'>Compromiso</span> — Asumimos la responsabilidad de nuestras funciones y de nuestros resultados.</li>
                                    <li><span className='text-gbm-green font-bold uppercase'>Responsabilidad</span> — Protegemos las propiedades, las personas y los entornos que se nos confían.</li>
                                    <li><span className='text-gbm-green font-bold uppercase'>Innovación</span> — Mejoramos continuamente nuestra tecnología, nuestros sistemas y nuestros métodos de servicio.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}