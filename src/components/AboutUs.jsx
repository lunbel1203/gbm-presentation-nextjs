import React, {useRef} from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function AboutUs () {
    const picturesRef = useRef(null);

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        const paragraphs = document.querySelectorAll('.paragraph-animation');
        
        // Primer párrafo visible por defecto
        gsap.set(paragraphs[0], { x: 0, opacity: 1 });
        
        // Párrafos restantes ocultos
        paragraphs.forEach((paragraph, index) => {
            if (index > 0) {
                gsap.set(paragraph, { x: '100%', opacity: 0 });
            }
        });

        createOptimizedScrollTrigger({
            trigger: '.about-section',
            start: 'top top',
            end: '+=4000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // Animación de tarjetas apareciendo una por una
                const employeeCards = picturesRef.current?.querySelectorAll('.employee-card');
                let secondCardStartProgress = 0;

                if (employeeCards) {
                    const totalCards = employeeCards.length; // 6 tarjetas
                    secondCardStartProgress = (2 / totalCards) * 0.75; // Momento cuando aparece la tercera tarjeta

                    employeeCards.forEach((card, index) => {
                        // Cada tarjeta aparece en diferentes momentos del scroll
                        const cardStartProgress = (index / totalCards) * 0.75; // Distribuir en el 75% del progress
                        const cardEndProgress = ((index + 1) / totalCards) * 0.75;

                        if (progress >= cardStartProgress && progress <= cardEndProgress) {
                            // La tarjeta está en su momento de aparecer
                            const localProgress = (progress - cardStartProgress) / (cardEndProgress - cardStartProgress);
                            const opacity = gsap.utils.interpolate(0, 1, localProgress);
                            const yPosition = gsap.utils.interpolate(50, 0, localProgress); // Viene de abajo

                            gsap.set(card, {
                                opacity: opacity,
                                y: yPosition + 'px',
                                scale: gsap.utils.interpolate(0.8, 1, localProgress)
                            });
                        } else if (progress > cardEndProgress) {
                            // La tarjeta ya apareció completamente
                            gsap.set(card, {
                                opacity: 1,
                                y: '0px',
                                scale: 1
                            });
                        } else {
                            // La tarjeta aún no debe aparecer
                            gsap.set(card, {
                                opacity: 0,
                                y: '50px',
                                scale: 0.8
                            });
                        }
                    });
                }

                // Animación de párrafos con transiciones suaves
                // Primer párrafo: visible al inicio, sale suavemente entre 20% y 35%
                if (progress < 0.20) {
                    gsap.set(paragraphs[0], {
                        x: '0%',
                        opacity: 1
                    });
                    gsap.set(paragraphs[1], { x: '100%', opacity: 0 });
                    gsap.set(paragraphs[2], { x: '100%', opacity: 0 });
                } else if (progress >= 0.20 && progress < 0.35) {
                    // Primer párrafo sale suavemente
                    const localProgress = (progress - 0.20) / 0.15;
                    gsap.set(paragraphs[0], {
                        x: gsap.utils.interpolate(0, -100, localProgress) + '%',
                        opacity: gsap.utils.interpolate(1, 0, localProgress)
                    });
                    gsap.set(paragraphs[1], { x: '100%', opacity: 0 });
                    gsap.set(paragraphs[2], { x: '100%', opacity: 0 });
                } else if (progress >= 0.35 && progress < 0.65) {
                    // Segundo párrafo entra y sale
                    const localProgress = (progress - 0.35) / 0.30;
                    gsap.set(paragraphs[0], { x: '-100%', opacity: 0 });
                    gsap.set(paragraphs[1], {
                        x: gsap.utils.interpolate(100, -100, localProgress) + '%',
                        opacity: localProgress < 0.5 ? gsap.utils.interpolate(0, 1, localProgress * 2) : gsap.utils.interpolate(1, 0, (localProgress - 0.5) * 2)
                    });
                    gsap.set(paragraphs[2], { x: '100%', opacity: 0 });
                } else if (progress >= 0.65) {
                    // Tercer párrafo entra y se queda
                    const localProgress = Math.min((progress - 0.65) / 0.20, 1);
                    gsap.set(paragraphs[0], { x: '-100%', opacity: 0 });
                    gsap.set(paragraphs[1], { x: '-100%', opacity: 0 });
                    gsap.set(paragraphs[2], {
                        x: gsap.utils.interpolate(100, 0, localProgress) + '%',
                        opacity: gsap.utils.interpolate(0, 1, localProgress)
                    });
                }

            }
        });

        // Estado inicial - todas las tarjetas ocultas
        const employeeCards = picturesRef.current?.querySelectorAll('.employee-card');
        if (employeeCards) {
            gsap.set(employeeCards, { 
                opacity: 0, 
                y: '50px',
                scale: 0.8
            });
        }
    }, []);

    return (
        <section id="about-us" className="about-section w-full h-screen py-20 px-8 bg-slate-50 relative">
            <div className="container mx-auto">
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
                <div ref={picturesRef} className="pictures-employees w-full mt-20 py-8 relative overflow-hidden">
                    <div className="w-max flex justify-between gap-3">
                        <div className="employee-card flex-shrink-0 w-72 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <Image
                                        src="/assets/images/lindsey-meinert.jpg"
                                        alt="Lindsey Meinert"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                        sizes="96px"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Lindsey Meinert</h3>
                            <p className="text-sm text-gray-600 text-center">Business Development Manager</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-68 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <Image
                                        src="/assets/images/ceverino-diaz.jpg"
                                        alt="Ceverino Diaz"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                        sizes="96px"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Ceverino Diaz</h3>
                            <p className="text-sm text-gray-600 text-center">Project Manager</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-68 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <Image
                                        src="/assets/images/rosa-bagaglio.jpg"
                                        alt="Rosa Bagaglio"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                        sizes="96px"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Rosa Bagaglio</h3>
                            <p className="text-sm text-gray-600 text-center">Recruitment & Engagement Manager</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-68 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <Image
                                        src="/assets/images/amanda-atchley.jpeg"
                                        alt="Amanda Atchley"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                        sizes="96px"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Amanda Atchley</h3>
                            <p className="text-sm text-gray-600 text-center">Account Executive</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-68 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <Image
                                        src="/assets/images/elaine-dearce.png"
                                        alt="Elaine DeArce"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                        sizes="96px"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#194263] mb-1">Elaine DeArce</h3>
                            <p className="text-sm text-gray-600 text-center">Business Development Representative</p>
                        </div>

                        <div className="employee-card flex-shrink-0 w-68 lg:w-60 flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#194263] to-[#92c13e] p-1 mb-4">
                                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                                    <Image
                                        src="/assets/images/silvia-nicola.jpg"
                                        alt="Silvia Nicola"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                        sizes="96px"
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