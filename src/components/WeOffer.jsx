import React from 'react'

const categories = [
    {
        title: 'Limpieza y Cuidado de Instalaciones',
        image: '/assets/images/offer-janitorial.jpg',
        services: ['Housekeeping', 'Auxiliar de Mantenimiento', 'Limpieza Profunda', 'Desinfección', 'Limpieza Post Construcción', 'Limpieza de Ventanas', 'Limpieza de Emergencia', 'Limpieza Ecológica'],
    },
    {
        title: 'Cuidado de Pisos y Superficies',
        image: '/assets/images/offer-hard-floor.jpeg',
        services: ['Mantenimiento de Alfombras', 'Instalación de Alfombras', 'Mantenimiento de Pisos Duros', 'Cuidado de Baldosas y Juntas', 'Pulido y Cristalizado de Pisos', 'Pisos Epóxicos', 'Limpieza de Tapicería'],
    },
    {
        title: 'Exteriores y Estacionales',
        image: '/assets/images/offer-landscaping.jpg',
        services: ['Manejo de Nieve y Hielo', 'Jardinería', 'Lavado a Presión', 'Limpieza de Paneles Solares'],
    },
    {
        title: 'Mantenimiento de Propiedades',
        image: '/assets/images/offer-maintenance-services.jpg',
        services: ['Pintura y Drywall', 'Servicios de Mantenimiento', 'Remoción de Escombros*'],
    },
    {
        title: 'Entornos Especializados',
        image: '/assets/images/offer-data-center.jpeg',
        services: ['Limpieza de Centros de Datos', 'Servicios de Áreas Controladas', 'Limpieza Especializada de Instalaciones'],
    },
]

export default function WeOffer() {
    return (
        <section id="we-offer" className="weOfferTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
            <div className="weOffer-overlay container mx-auto px-6 lg:px-8">

                {/* Header Section */}
                <div className="weOffer-title w-full text-center">
                    <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                        Soluciones Integrales para Instalaciones
                    </h2>
                    <h3 className="text-2xl lg:text-4xl font-bold text-gbm-green mb-6">Una Propiedad. Un Socio.</h3>
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
