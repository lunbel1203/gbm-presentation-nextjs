import React from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function WeOffer () {
    useGSAP (() => {
        // Configuración inicial para las cards
        gsap.set('.weOffer-cards', { y: '100vh', opacity: 0 });

        // ScrollTrigger optimizado para 21 cards
        createOptimizedScrollTrigger({
            trigger: '.weOfferTrigger',
            start: 'top top',
            end: '+=6000', // Más espacio para las 21 cards
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Animación suave de las cards subiendo desde abajo
                const yPosition = gsap.utils.interpolate(100, -20, progress);
                const opacity = gsap.utils.interpolate(0, 1, Math.min(progress * 2, 1));
                
                gsap.set('.weOffer-cards', {
                    y: `${yPosition}vh`,
                    opacity: opacity
                });
            }
        });

    }, []);

    return (
        <>
            <section id="we-offer" className="weOfferTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-10">
                <div className="weOffer-overlay container mx-auto px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="weOffer-title w-full text-center">
                        <h2 className="text-44xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                            lo que ofrecemos
                        </h2>
                        <h3 className="text-2xl lg:text-4xl font-bold text-gbm-green mb-6">Nuestros servicios principales</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                    </div>

                    {/* Modern Cards */}
                    <div className="weOffer-cards w-full mx-auto space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

                        {/* Card 1 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-data-center.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LIMPIEZA DE CENTROS DE DATOS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Proteja sus datos con soluciones de limpieza especializadas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-cleanroom-services.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SERVICIOS DE SALAS LIMPIAS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Garantizando un ambiente impecable para sus operaciones críticas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-janitorial.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        CONSERJERÍA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Garantizando una limpieza impecable.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-day-porter.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        PORTERO DE DÍA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Manos extras a su servicio garantizando un ambiente limpio y saludable para todos dentro de su instalación.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-deep-cleaning.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LIMPIEZA PROFUNDA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Garantizando que cada rincón brille para usted.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 6 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-green-cleaning.webp')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LIMPIEZA ECOLÓGICA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Sé ecológico y mantén el ambiente limpio.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 7 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-windows-cleaning.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LIMPIEZA DE VENTANAS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Logra claridad impecable con nuestras soluciones profesionales de limpieza de ventanas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 8 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-tile-stone-care.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        CUIDADO DE AZULEJOS Y PIEDRAS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Revitaliza tus superficies con nuestras soluciones impecables de cuidado de azulejos y piedras.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 9 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-solar-panel.png')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LIMPIEZA DE PANELES SOLARES
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Mantén tus paneles solares impecables para una producción óptima de energía.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 10 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-pressure-washing.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LAVADO A PRESIÓN
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Déjanos la presión para una limpieza profunda que hará brillar tus superficies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 11 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-post-construction.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        POST CONSTRUCCIÓN
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Déjanos el desorden: servicios profesionales de limpieza post construcción.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 12 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-maintenance-services.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SERVICIOS DE MANTENIMIENTO
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Servicios de mantenimiento confiables para mantener su propiedad en óptimas condiciones.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 13 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-epoxy-flooring-alt.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        PISOS EPÓXICOS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Pisos epóxicos personalizables para un acabado elegante y profesional.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 14 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-concrete.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        PULIDO DE CONCRETO
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Revitaliza tus pisos con pulido y triturado de concreto de precisión.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 15 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-disinfection-services.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SERVICIOS DE DESINFECCIÓN
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Mantengamos tu negocio no solo limpio, sino también saludable y libre de gérmenes y bacterias.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 16 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-emergency.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SERVICIOS DE LIMPIEZA DE EMERGENCIA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Servicios de limpieza de emergencia con respuesta rápida cuando más nos necesites.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 17 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-upholstery.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        TAPICERÍA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Ya sean sofás, sillas o incluso paredes de cubículos: podemos dejar la tapicería de tu organización como nueva.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 18 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-carpet-maintenance.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        MANTENIMIENTO DE ALFOMBRAS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Aspirar no es suficiente para mantener tus alfombras limpias.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 19 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-hard-floor.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        MANTENIMIENTO DE PISOS DUROS
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Servicios de mantenimiento de pisos duros adaptados para cada tipo de superficie.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 20 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-snow-removing.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        REMOCIÓN DE NIEVE
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Mantén tu negocio seguro y accesible durante todo el invierno.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 21 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-landscaping.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SERVICIOS DE JARDINERÍA
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Las primeras impresiones comienzan afuera. Nuestros servicios profesionales de jardinería mantienen tu propiedad impecable, acogedora y bien cuidada todo el año.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 22 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-52">
                            <div className="flex items-center gap-6 h-full">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/painting.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        PINTURA Y DRYWALL
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Precisión en cada pared, perfección en cada capa.
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