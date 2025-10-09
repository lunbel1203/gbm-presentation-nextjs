'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
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
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isMobile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center px-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Presentación no disponible en móvil</h1>
                    <p className="text-lg text-gray-600">Esta presentación solo está disponible en escritorio. Por favor ábrela desde una computadora para la mejor experiencia.</p>
                </div>
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