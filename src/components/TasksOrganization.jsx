import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function tasksOrganization () {
    useGSAP (() => {
        // Configuración inicial - el overlay (contenido) empieza en y: 0 (arriba de la pantalla)
        gsap.set('.tasksOrganization-overlay', { y: '-100vh' });

        // ScrollTrigger para la primera fase - overlay se mueve a su posición actual
        ScrollTrigger.create({
            trigger: '.tasksOrganizationTrigger',
            start: 'top top',
            end: '+=2000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Fase 1: Overlay se mueve desde arriba (-100vh) a su posición actual (0)
                const yPosition = gsap.utils.interpolate(-100, 0, progress);
                gsap.set('.tasksOrganization-overlay', {
                    y: `${yPosition}vh`
                });
            }
        });

    }, []);

    return (
        <>
            <section className="tasksOrganizationTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="tasksOrganization-overlay container mx-auto px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="text-center my-16">
                        <h2 className="text-44xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                            TASKS ORGANIZATION
                        </h2>
                        <h3 className="text-2xl lg:text-4xl font-bold text-gray-600 mb-6">Team Cleaning</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                        <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            In the team cleaning approach individual cleaners are assigned specialized tasks to ensure maximum efficiency and expertise.
                        </p>
                    </div>

                    {/* Modern Cards */}
                    <div className="tasksOrganization-cards w-1/2 mx-auto space-y-6">
                        
                        {/* Card 1 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-68 h-96 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <img 
                                        src="/assets/images/task-light-duty.jpg" 
                                        alt="Light Duty Cleaning" 
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
                                <div className="relative w-68 h-96 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <img 
                                        src="/assets/images/task-restroom.jpg" 
                                        alt="Restroom Cleaning" 
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
                                <div className="relative w-68 h-96 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <img 
                                        src="/assets/images/task-vaccum.jpg" 
                                        alt="Vacuum Cleaning" 
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
                                <div className="relative w-68 h-96 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <img 
                                        src="/assets/images/task-utility.jpg" 
                                        alt="Utility Cleaning" 
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
            </section>
        </>
    )
}