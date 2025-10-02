import React from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react';

export default function tasksOrganization () {
    useGSAP (() => {
        // Configuración inicial
        gsap.set('.task-title', { y: 0, opacity: 1 });
        gsap.set('.tasksOrganization-cards', { y: '150vh', opacity: 1 });

        // ScrollTrigger para la animación inmediata
        createOptimizedScrollTrigger({
            trigger: '.tasksOrganizationTrigger',
            start: 'top top',
            end: '+=4000',
            scrub: 0.3,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Animación directa: contenido empieza a subir inmediatamente (0% - 100%)
                const yPosition = gsap.utils.interpolate(150, -50, progress);
                gsap.set('.tasksOrganization-cards', {
                    y: `${yPosition}vh`,
                    opacity: 1
                });
            }
        });

        // ScrollTrigger adicional para fade out cuando lleguen al título de WeOffer
        createOptimizedScrollTrigger({
            trigger: '.weOffer-title',
            start: 'bottom bottom', // Cuando el bottom del título toca el bottom del viewport
            end: 'bottom top',      // Cuando el bottom del título llega al top del viewport
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Los cards desaparecen cuando llegan justo debajo del título
                const opacity = gsap.utils.interpolate(1, 0, progress);
                
                gsap.set('.tasksOrganization-cards', {
                    opacity: opacity
                });
            }
        });

    }, []);

    return (
        <>
            <section id="tasks-organization" className="tasksOrganizationTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="tasksOrganization-overlay w-full h-screen flex items-center px-6 lg:px-8">
                    
                    {/* Header Section - Lado izquierdo */}
                    <div className="task-title w-[40%] text-left pr-8">
                        <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                            TASKS ORGANIZATION
                        </h2>
                        <h3 className="text-2xl lg:text-4xl font-bold text-gray-600 mb-6">Team Cleaning</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mb-8"></div>
                        <p className="text-lg lg:text-2xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold leading-relaxed">
                            In the team cleaning approach individual cleaners are assigned specialized tasks to ensure maximum efficiency and expertise.
                        </p>
                    </div>

                    {/* Modern Cards - Lado derecho */}
                    <div className="tasksOrganization-cards w-[60%] pl-8">
                        <div className="space-y-6">
                        
                                {/* Card 1 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-68 h-96 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src="/assets/images/task-light-duty.jpg"
                                                alt="Light Duty Cleaning"
                                                width={272}
                                                height={384}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <h3 className="text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                                Light duty Specialist (LD)
                                            </h3>
                                            <p className="text-gray-700 text-base leading-relaxed">
                                                The cleaner will be responsible for doing the light duty (LD) sweep of the area to be cleaned, removing all the trash and any large object on the floor.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-68 h-96 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <Image 
                                                src="/assets/images/task-restroom.jpg"
                                                alt="Restroom Cleaning"
                                                width={272}
                                                height={384}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <h3 className="text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                                Restrooms Specialist (RS)
                                            </h3>
                                            <p className="text-gray-700 text-base leading-relaxed">
                                                The cleaner will be responsible to clean, sanitize and fill the supplies of the bathrooms.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-68 h-96 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <Image 
                                                src="/assets/images/task-vaccum.jpg"
                                                alt="Vacuum Cleaning"
                                                width={272}
                                                height={384}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <h3 className="text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                                Vaccum Specialist (VS)
                                            </h3>
                                            <p className="text-gray-700 text-base leading-relaxed">
                                                The cleaner will be responsible for thoroughly vacuuming the area while making sure no objects were left behind from the LD sweep, checking all trash bins in the area as well.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-68 h-96 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <Image 
                                                src="/assets/images/task-utility.jpg"
                                                alt="Utility Cleaning"
                                                width={272}
                                                height={384}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <h3 className="text-4xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                                Utilities specialist (US)
                                            </h3>
                                            <p className="text-gray-700 text-base leading-relaxed">
                                                The cleaner will be responsible for mopping, disinfecting, buffing and auto scrubbing the floor, as well as other tasks, as assigned.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}