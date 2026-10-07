import React from 'react'
import Image from 'next/image'

const providers = ['Cleaning company.', 'Floor company.', 'Snow company.', 'Landscaper.', 'Maintenance company.']

export default function OnePartner() {
    return (
        <section id="one-partner" className="onePartnerTrigger w-full min-h-screen bg-slate-50 flex items-center py-16">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">One Partner. Multiple Solutions.</h2>
                <h3 className="text-xl lg:text-3xl font-bold text-gray-600 mb-6 uppercase">Tired of dealing with multiple service providers?</h3>
                <div className="w-24 h-1 bg-gbm-green mx-auto mb-12"></div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 mb-12">
                    <ul className="flex flex-col gap-4">
                        {providers.map((provider) => (
                            <li key={provider} className="flex items-center gap-4 text-xl lg:text-2xl font-bold text-[#194263] bg-white rounded-lg shadow px-6 py-3 border border-gray-100">
                                <span>{provider}</span>
                                <span className="text-gbm-green text-3xl ml-auto">&rarr;</span>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-[#194263] rounded-2xl p-8 shadow-xl">
                        <Image
                            src="/assets/images/logo-white.png"
                            alt="Glaring Building Maintenance"
                            width={300}
                            height={150}
                            className="w-56 lg:w-72 h-auto"
                        />
                    </div>
                </div>

                <p className="text-2xl lg:text-4xl font-black text-[#194263] mb-3">One Property. One Partner.</p>
                <p className="text-lg lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">Glaring brings multiple facility services together under one accountable team.</p>
            </div>
        </section>
    )
}
