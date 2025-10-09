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
                            ORGANIZACIÓN DE TAREAS
                        </h2>
                        <h3 className="text-2xl lg:text-4xl font-bold text-gray-600 mb-6">Limpieza en Equipo</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mb-8"></div>
                        <p className="text-lg lg:text-2xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold leading-relaxed">
                            En el enfoque de limpieza en equipo, a cada personal de limpieza se le asignan tareas especializadas para garantizar la máxima eficiencia y experiencia.
                        </p>
                    </div>

                    {/* Modern Cards - Lado derecho */}
                    <div className="tasksOrganization-cards w-[60%] pl-8">
                        <div className="space-y-6">
                        
                                {/* Card 1 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-48">
                                    <div className="flex h-full">
                                        <div className="relative w-64 flex-shrink-0">
                                            <Image
                                                src="/assets/images/task-light-duty.jpg"
                                                alt="Light Duty Cleaning"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-2">
                                                Especialista en Tareas Ligeras (LD)
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                El personal de limpieza será responsable de realizar el barrido ligero (LD) del área a limpiar, removiendo toda la basura y cualquier objeto grande del piso.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-48">
                                    <div className="flex h-full">
                                        <div className="relative w-64 flex-shrink-0">
                                            <Image
                                                src="/assets/images/task-restroom.jpg"
                                                alt="Restroom Cleaning"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-2">
                                                Especialista en Baños (RS)
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                El personal de limpieza será responsable de limpiar, sanitizar y reponer los suministros de los baños.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-48">
                                    <div className="flex h-full">
                                        <div className="relative w-64 flex-shrink-0">
                                            <Image
                                                src="/assets/images/task-vaccum.jpg"
                                                alt="Vacuum Cleaning"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-2">
                                                Especialista en Aspirado (VS)
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                El personal de limpieza será responsable de aspirar completamente el área asegurándose de que no quedaron objetos del barrido ligero, verificando también todos los zafacones del área.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-48">
                                    <div className="flex h-full">
                                        <div className="relative w-64 flex-shrink-0">
                                            <Image
                                                src="/assets/images/task-utility.jpg"
                                                alt="Utility Cleaning"
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-2">
                                                Especialista en Utilidades (US)
                                            </h3>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                El personal de limpieza será responsable de mapear, desinfectar, pulir y fregar automáticamente el piso, así como otras tareas asignadas.
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