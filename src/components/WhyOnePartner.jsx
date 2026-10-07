import React from 'react'
import Image from 'next/image'

const providers = ['Cleaning', 'Floors', 'Snow', 'Landscaping', 'Painting', 'Maintenance']

export default function WhyOnePartner() {
    return (
        <section id="why-one-partner" className="whyOnePartnerTrigger w-full min-h-screen bg-[#194263] text-white flex items-center py-16">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-6xl font-black bg-gradient-to-r from-[#ffffff] to-gbm-green bg-clip-text text-transparent uppercase mb-8">Tired Of Managing Multiple Service Providers?</h2>
                <div className="w-24 h-1 bg-gbm-green mx-auto mb-10"></div>

                <p className="text-xl lg:text-3xl font-bold text-gray-100 mb-6">Cleaning. Floors. Snow. Landscaping. Painting. Maintenance.</p>
                <p className="text-lg lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-4">Managing multiple companies means multiple contacts, schedules, contracts and standards.</p>
                <p className="text-2xl lg:text-4xl font-black text-gbm-green mb-12">Glaring simplifies facility care.</p>

                {/* Visual: MULTIPLE PROVIDERS -> ONE GLARING PARTNER */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
                    <div className="flex flex-wrap justify-center gap-3 max-w-xl">
                        {providers.map((provider) => (
                            <span key={provider} className="px-4 py-2 rounded-full border border-white/40 text-base lg:text-lg font-semibold">{provider}</span>
                        ))}
                        <span className="w-full text-sm lg:text-base font-black tracking-widest text-gray-300 mt-2">MULTIPLE PROVIDERS</span>
                    </div>
                    <span className="text-gbm-green text-5xl font-black">&rarr;</span>
                    <div className="flex flex-col items-center gap-3">
                        <Image src="/assets/images/logo-white.png" alt="Glaring Building Maintenance" width={300} height={150} className="w-48 lg:w-60 h-auto" />
                        <span className="text-sm lg:text-base font-black tracking-widest text-gbm-green">ONE GLARING PARTNER</span>
                    </div>
                </div>

                <p className="text-lg lg:text-2xl font-bold text-gray-100">One Relationship. One Point of Contact. Multiple Facility Solutions.</p>
            </div>
        </section>
    )
}
