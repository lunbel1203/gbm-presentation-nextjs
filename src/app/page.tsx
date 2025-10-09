'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Intro from '@/components/Intro'

// Dynamic imports con loading fallbacks para componentes no críticos
const AboutUs = dynamic(() => import('@/components/AboutUs'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const MisionVision = dynamic(() => import('@/components/MisionVision'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const GlaringClean = dynamic(() => import('@/components/GlaringClean'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const OurPeople = dynamic(() => import('@/components/OurPeople'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const WorkerCompensation = dynamic(() => import('@/components/WorkerCompensation'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const ChooseUs = dynamic(() => import('@/components/Choose-Us'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const SecuritySystem = dynamic(() => import('@/components/SecuritySystem'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const OurWork = dynamic(() => import('@/components/OurWork'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const ContingencyPlan = dynamic(() => import('@/components/ContingencyPlan'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const QualityAssurance = dynamic(() => import('@/components/QualityAssurance'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const CrossContamination = dynamic(() => import('@/components/CrossContamination'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const TasksOrganization = dynamic(() => import('@/components/TasksOrganization'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const Equipment = dynamic(() => import('@/components/Equipment'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const WeOffer = dynamic(() => import('@/components/WeOffer'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const Certificates = dynamic(() => import('@/components/Certificates'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const WeServe = dynamic(() => import('@/components/WeServe'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const GlaringStandard = dynamic(() => import('@/components/GlaringStandard'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const ReferProgram = dynamic(() => import('@/components/ReferProgram'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const ContactUs = dynamic(() => import('@/components/ContactUs'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const ThankYou = dynamic(() => import('@/components/ThankYou'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const Sponsor = dynamic(() => import('@/components/Sponsor'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

const Fundation = dynamic(() => import('@/components/Fundation'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />
})

export default function Home() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isMobile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#194263] via-[#2c5a7d] to-gbm-green relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gbm-green rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                    {/* Logo */}
                    <div className="mb-12 animate-fadeIn">
                        <Image
                            src="/assets/images/logo-white.png"
                            alt="Glaring Building Maintenance"
                            width={300}
                            height={150}
                            className="w-64 h-auto mx-auto drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Contenido */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Presentación No Disponible
                        </h1>
                        <div className="w-24 h-1 bg-gbm-green mx-auto mb-6 rounded-full"></div>
                        {/* Icono de dispositivo */}
                        <div className="animate-bounce">
                            <svg
                                className="w-20 h-20 mx-auto text-white/80"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>

                          <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                              Esta presentación está optimizada para pantallas de escritorio.
                          </p>
                          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                                  Por favor, ábrela desde una <span className="text-gbm-green font-bold">computadora</span> para disfrutar de la mejor experiencia con todas las animaciones e interacciones.
                              </p>
                          </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="mt-10 space-y-4">
                        <p className="text-white/80 text-base font-semibold mb-4">
                            ¿Necesitas ayuda? Contáctanos
                        </p>
                        <div className="flex flex sm:flex-row gap-4 justify-center items-center">
                            {/* Email */}
                            <a
                                href="mailto:contactus@glaringmaintenance.com"
                                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-105 text-white/90 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium">Email</span>
                            </a>

                            {/* Website */}
                            <a
                                href="https://glaringmaintenance.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 hover:scale-105 text-white/90 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-sm font-medium">Website</span>
                            </a>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 1s ease-out;
                    }
                `}</style>
            </div>
        )
    }

    return (
        <div className="w-full">

            <Navigation />

            <Intro />

            <AboutUs />

            <MisionVision />

            <GlaringClean />

            <OurPeople />

            <WorkerCompensation />

            <ChooseUs />

            <SecuritySystem />

            <OurWork />

            <ContingencyPlan />

            <QualityAssurance />

            <CrossContamination />

            <TasksOrganization />

            <Equipment />

            <Sponsor />

            <Fundation />

            <WeOffer />

            <GlaringStandard />

            <Certificates />

            <WeServe />

            <ReferProgram />

            <ContactUs />

            <ThankYou />

        </div>
    )
}