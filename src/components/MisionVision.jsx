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
                                En Glaring Building Maintenance, nuestra misión es alcanzar la total satisfacción de nuestros clientes, permitiéndoles concentrarse en los objetivos de su propia organización y alcanzar el éxito con mayor rapidez. Al mismo tiempo, promovemos el bienestar y la satisfacción de nuestros empleados, impulsando una cultura de excelencia y mejora continua en todos nuestros servicios.
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
                                Ser reconocidos como la empresa líder en la provisión de soluciones de limpieza por la calidad de nuestros servicios y compromiso con nuestros clientes.
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
                                    <li><span className='text-gbm-green font-bold'>Honestidad:</span> Creemos firmemente en la honestidad como uno de los pilares esenciales que guían todas nuestras acciones. Actuamos con transparencia, coherencia y respeto por la verdad, estableciendo relaciones basadas en la confianza y la integridad.</li>
                                    <li><span className='text-gbm-green font-bold'>Compromiso:</span> Valoramos el compromiso de cada miembro de nuestro equipo con sus responsabilidades y con los objetivos de la organización. Promovemos la dedicación, la cooperación y el sentido de pertenencia como elementos clave para alcanzar resultados de excelencia.</li>
                                    <li><span className='text-gbm-green font-bold'>Responsabilidad:</span> Asumimos con plena conciencia las consecuencias de nuestras decisiones y acciones. Nos comprometemos a mantener entornos seguros y saludables para nuestros clientes y empleados, así como a operar de manera sostenible y respetuosa con el medio ambiente.</li>
                                    <li><span className='text-gbm-green font-bold'>Innovación:</span> Fomentamos una cultura de mejora continua y búsqueda constante de nuevas soluciones. Adoptamos tecnologías, procesos y prácticas innovadoras que nos permiten optimizar nuestros servicios, anticiparnos a las necesidades de nuestros clientes y mantenernos a la vanguardia del sector.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}