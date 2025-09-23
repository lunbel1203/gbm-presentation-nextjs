import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Certificates () {
    
    useGSAP(() => {
        const cards = gsap.utils.toArray(".certificate-card");
        
        cards.forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    x: -200,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".certificatesTrigger",
                        start: "top 90%",
                        end: "top 30%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);

    return (
        <>
            <section id="certificates" className="certificatesTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="certificates-overlay container mx-auto px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="text-center my-16">
                        <h2 className="text-44xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                            OUR CERTIFICATIONS
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                    </div>

                    {/* Modern Cards */}
                    <div className="certificates-cards w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
                        
                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 w-80">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <img src="/assets/images/certificate-osha.webp" alt="OSHA Certification" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">OSHA Certification</h3>
                                    <p className="text-gray-600 text-sm">Occupational Safety and Health Administration compliance certification</p>
                                </div>
                            </div>
                        </div>

                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 w-80">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <img src="/assets/images/certificate-issa.png" alt="ISSA Certification" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">ISSA Certification</h3>
                                    <p className="text-gray-600 text-sm">International Sanitary Supply Association professional certification</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 w-80">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <img src="/assets/images/certificate-ifma.svg" alt="IFMA Certification" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">IFMA Certification</h3>
                                    <p className="text-gray-600 text-sm">International Facility Management Association certification</p>
                                </div>
                            </div>
                        </div>

                        <div className="certificate-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gbm-green/30 hover:-translate-y-2 w-80">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-32 mb-4">
                                    <img src="/assets/images/certificate-green-building.png" alt="Green Building Certification" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-[#194263] mb-2">Green Building</h3>
                                    <p className="text-gray-600 text-sm">Sustainable and environmentally responsible building practices</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}