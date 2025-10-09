import React from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { useGSAP } from '@gsap/react'





export default function Certificates () {
    
    useGSAP(() => {
        if (typeof window === 'undefined') return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".certificatesTrigger",
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1
            }
        });

        const cards = gsap.utils.toArray(".certificate-card");

        cards.forEach((card, index) => {
            tl.fromTo(card,
                {
                    x: -200,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                },
                index * 0.15
            );
        });

        // Mantener la sección visible después de la animación
        tl.to({}, { duration: 1 });
    }, []);

    return (
        <>
            <section id="certificates" className="certificatesTrigger w-full min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="certificates-overlay container mx-auto px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="text-center my-16">
                        <h2 className="text-44xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                            NUESTRAS CERTIFICACIONES
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                    </div>

                    {/* Modern Cards */}
                    <div className="certificates-cards w-full max-w-7xl mx-auto flex justify-center gap-8">

                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 flex-1 max-w-xs">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <Image src="/assets/images/certificate-osha.webp" alt="OSHA Certification" width={200} height={128} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">Certificación OSHA</h3>
                                    <p className="text-gray-600 text-sm">Certificación de cumplimiento de la Administración de Seguridad y Salud Ocupacional</p>
                                </div>
                            </div>
                        </div>

                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 flex-1 max-w-xs">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <Image src="/assets/images/certificate-issa.png" alt="ISSA Certification" width={200} height={128} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">Certificación ISSA</h3>
                                    <p className="text-gray-600 text-sm">Certificación profesional de la Asociación Internacional de Suministros Sanitarios</p>
                                </div>
                            </div>
                        </div>

                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 flex-1 max-w-xs">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <Image src="/assets/images/certificate-ifma.svg" alt="IFMA Certification" width={200} height={128} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">Certificación IFMA</h3>
                                    <p className="text-gray-600 text-sm">Certificación de la Asociación Internacional de Gestión de Instalaciones</p>
                                </div>
                            </div>
                        </div>

                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 flex-1 max-w-xs">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <Image src="/assets/images/certificate-green-building.png" alt="Green Building Certification" width={200} height={128} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">Edificios Verdes</h3>
                                    <p className="text-gray-600 text-sm">Prácticas de construcción sostenibles y ambientalmente responsables</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}