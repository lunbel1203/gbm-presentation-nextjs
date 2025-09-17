import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUs () {
    const picturesRef = useRef(null);

    useGSAP(() => {
        const paragraphs = document.querySelectorAll('.paragraph-animation');
        const employeeCards = document.querySelectorAll('.employee-card');
        
        // Primer párrafo visible por defecto
        gsap.set(paragraphs[0], { x: 0, opacity: 1 });
        
        // Párrafos restantes ocultos
        paragraphs.forEach((paragraph, index) => {
            if (index > 0) {
                gsap.set(paragraph, { x: '100%', opacity: 0 });
            }
        });

        // Posición inicial del contenedor de empleados
        gsap.set(picturesRef.current, { x: '-100%', opacity: 1 });

        ScrollTrigger.create({
            trigger: '.about-section',
            start: 'top top',
            end: '+=4000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Resetear todos los elementos primero
                paragraphs.forEach(p => gsap.set(p, { opacity: 0, x: '100%' }));
                employeeCards.forEach(card => gsap.set(card, { opacity: 0, x: '-100%' }));
                
                if (progress < 0.25) {
                    // Primer párrafo visible y sale
                    gsap.set(paragraphs[0], { 
                        x: gsap.utils.interpolate(0, -100, progress / 0.25) + '%',
                        opacity: 1 - (progress / 0.25)
                    });
                } else if (progress >= 0.25 && progress < 0.5) {
                    // Segundo párrafo entra y sale
                    const localProgress = (progress - 0.25) / 0.25;
                    gsap.set(paragraphs[1], { 
                        x: gsap.utils.interpolate(100, -100, localProgress) + '%',
                        opacity: 1
                    });
                } else if (progress >= 0.5) {
                    // Tercer párrafo entra y se queda en posición del primer párrafo
                    const localProgress = Math.min((progress - 0.5) / 0.25, 1);
                    gsap.set(paragraphs[2], { 
                        x: gsap.utils.interpolate(100, 0, localProgress) + '%',
                        opacity: 1
                    });
                }

                // Animar todo el contenedor pictures-employees de izquierda a derecha
                if (picturesRef.current) {
                    if (progress >= 0.1) {
                        // Calcular progreso de la animación (de 10% a 100% del scroll)
                        const animProgress = Math.min((progress - 0.1) / 0.9, 1);
                        
                        // Mover de -100% a 0%
                        const xPosition = gsap.utils.interpolate(-100, 0, animProgress);
                        
                        gsap.set(picturesRef.current, { 
                            x: xPosition + '%'
                        });
                    }
                }
            }
        });
    }, []);

    return (
        <section className="about-section section h-screen py-20 px-8 bg-slate-50 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-left mb-16">
                    <h2 className="text-7xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-4">About Us</h2>
                    <div className="w-24 h-1 bg-gbm-green"></div>
                </div>
                
                {/* Description */}
                <div className="h-60 text-container text-[18px] lg:text-4xl font-bold relative">
                    <p className="paragraph-animation absolute text-left w-full lg:max-w-6xl mx-auto leading-6 lg:leading-12 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">
                        At Glaring Building Maintenance (GBM), we make your property our priority. As a first-class provider of commercial cleaning services, we set the standard for excellence in our industry. For more than 20 years, we’ve delivered specialized solutions with a focus on quality, accountability, and environmentally responsible practices.
                    </p>
                    <p className="paragraph-animation absolute text-left w-full lg:max-w-6xl mx-auto leading-6 lg:leading-12 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">
                        Unlike many others, we never subcontract our work—every service is handled directly by our trained Glaring team, ensuring consistency, reliability, and the highest standards of excellence.
                    </p>
                    <p className="paragraph-animation absolute text-left w-full lg:max-w-6xl mx-auto leading-6 lg:leading-12 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">
                        Our reputation as one of the best in the business has been built on innovation, technology-driven quality control, and strong management practices. Most importantly, we’ve grown through client referrals—proof of the long-term trust and partnerships we’ve earned with major offices and industrial facilities.
                    </p>
                </div>

                {/* Fotos empleados */}
                <div ref={picturesRef} className="pictures-employees w-full mt-20 relative">
                    <div className="flex overflow-visible max-w-7xl mx-auto gap-4 px-4">
                        <div className="employee-card flex-shrink-0 w-80 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                                        alt="John Smith" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Lindsey Meinert</h3>
                            <p className="text-sm text-gray-600 text-center">Business Development Manager</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-80 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face" 
                                        alt="Sarah Johnson" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Ceverino Diaz</h3>
                            <p className="text-sm text-gray-600 text-center">Project Manager</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-80 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                                        alt="Mike Rodriguez" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Rosa Bagaglio</h3>
                            <p className="text-sm text-gray-600 text-center">Recruitment & Engagement Manager</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-80 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                                        alt="Lisa Chen" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Amanda Atchley</h3>
                            <p className="text-sm text-gray-600 text-center">Account Executive</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-80 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                                        alt="Lisa Chen" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Elene</h3>
                            <p className="text-sm text-gray-600 text-center">Account Executive</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-80 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                                        alt="Lisa Chen" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Silvia Nicola</h3>
                            <p className="text-sm text-gray-600 text-center">Account Manager</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}