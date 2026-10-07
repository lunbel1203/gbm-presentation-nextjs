import React from 'react'

const categories = [
    {
        title: 'Cleaning & Facility Care',
        image: '/assets/images/offer-janitorial.png',
        services: ['Janitorial', 'Day Porter', 'Deep Cleaning', 'Disinfection', 'Post-Construction Cleaning', 'Window Cleaning', 'Emergency Cleaning', 'Green Cleaning'],
    },
    {
        title: 'Floor & Surface Care',
        image: '/assets/images/offer-hard-floor.jpeg',
        services: ['Carpet Maintenance', 'Carpet Installation', 'Hard Floor Maintenance', 'Tile & Stone Care', 'Concrete Grinding & Polishing', 'Epoxy Flooring', 'Upholstery'],
    },
    {
        title: 'Exterior & Seasonal',
        image: '/assets/images/offer-snow-removal.png',
        services: ['Snow & Ice Management', 'Landscaping', 'Pressure Washing', 'Solar Panel Cleaning'],
    },
    {
        title: 'Property Maintenance',
        image: '/assets/images/offer-maintenance-services.png',
        services: ['Painting & Drywall', 'Maintenance Services', 'Junk Removal*'],
    },
    {
        title: 'Specialized Environments',
        image: '/assets/images/offer-data-center.png',
        services: ['Data Center Cleaning', 'Cleanroom Services', 'Specialized Facility Cleaning'],
    },
]

export default function WeOffer() {
    return (
        <section id="we-offer" className="weOfferTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="weOffer-overlay container mx-auto px-6 lg:px-8">

                {/* Header Section */}
                <div className="weOffer-title w-full text-center">
                    <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                        Complete Facility Solutions
                    </h2>
                    <h3 className="text-2xl lg:text-4xl font-bold text-gbm-green mb-6">One Property. One Partner.</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-12"></div>
                </div>

                {/* Category cards */}
                <div className="weOffer-cards w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={category.title}
                            className={`group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : ''}`}
                        >
                            <div
                                className="h-44 bg-cover bg-center relative"
                                style={{ backgroundImage: `url('${category.image}')` }}
                            >
                                <div className="absolute inset-0 bg-[#194263]/55"></div>
                                <h3 className="absolute bottom-4 left-5 right-5 text-2xl font-black text-white uppercase leading-tight">
                                    {category.title}
                                </h3>
                            </div>
                            <ul className="p-5 flex flex-wrap gap-2">
                                {category.services.map((service) => (
                                    <li
                                        key={service}
                                        className="px-3 py-1.5 rounded-full bg-slate-100 text-[#194263] text-sm font-semibold border border-gray-200"
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
