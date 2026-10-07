import React from 'react'

const industries = [
    'Industrial y Manufactura',
    'Instituciones Educativas',
    'Instalaciones Médicas',
    'Oficinas',
    'Clínicas Dentales y de Ortodoncia',
    'Tiendas Minoristas',
    'Gimnasios y Fitness',
    'Bancos e Instituciones Financieras',
    'Condominios',
    'Farmacéuticas',
]

export default function Industries() {
    return (
        <section id="industries" className="industriesTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center py-16">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">Diferentes Instalaciones. Diferentes Exigencias.</h2>
                <h3 className="text-2xl lg:text-4xl font-bold text-gbm-green mb-6">Un Socio Preparado Para Atenderlas.</h3>
                <div className="w-24 h-1 bg-gbm-green mx-auto mb-12"></div>

                <ul className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto mb-12">
                    {industries.map((industry) => (
                        <li key={industry} className="px-6 py-3 rounded-full bg-white text-[#194263] text-lg lg:text-xl font-bold shadow border border-gray-100">
                            {industry}
                        </li>
                    ))}
                </ul>

                <p className="text-xl lg:text-3xl font-black text-[#194263]">Su instalación no es genérica. Su plan de servicio tampoco debería serlo.</p>
            </div>
        </section>
    )
}
