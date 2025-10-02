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
                            what we offer
                        </h2>
                        <h3 className="text-2xl lg:text-4xl font-bold text-gray-600 mb-6">Our core services</h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                    </div>

                    {/* Modern Cards */}
                    <div className="weOffer-cards w-full mx-auto space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                        
                        {/* Card 1 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Data-Center.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        DATA CENTER CLEANING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Safeguard Your Data with Specialized Cleaning solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Cleanroom-Services.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        CLEANROOM SERVICES
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Ensuring a Pristine Environment for Your Critical Operations.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-janitorial.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        JANITORIAL
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Ensuring glaring cleanliness.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-day-porter.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        DAY PORTER
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Extra hands at your service ensuring a clean and healthy environment for everyone within your facility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Deep-Cleaning.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        DEEP CLEANING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Ensuring that every little corner is glaring for you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 6 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-green-cleaning.webp')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        GREEN CLEANING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Go green and make the environment clean.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 7 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Windows-Cleaning.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        WINDOW CLEANING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Achieve Glaring Clarity with Our Professional Window Cleaning Solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 8 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Tile-Stone-Care.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        TILE & STONE CARE
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Revitalize Your Surfaces with Our Glaring Tile & Stone Care Solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 9 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Solar-Panel.png')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SOLAR PANEL CLEANING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Keep Your Solar Panels Pristine for Optimal Energy Production.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 10 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-pressure-washing.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        PRESSURE WASHING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Leave the Pressure to Us for a Deep Clean That Makes Your Surfaces Shine.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 11 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Post-Construction.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        POST CONSTRUCTION
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Leave the Mess to Us – Professional Post Construction Cleaning Services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 12 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Maintenance-Services.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        MAINTENANCE SERVICES
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Reliable Maintenance Services to Keep Your Property in Top Condition.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 13 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Epoxy-Flooring.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        EPOXY FLOORING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Customizable Epoxy Floors for a Sleek, Professional Finish.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 14 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Concrete.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        CONCRETE GRINDING POLISHING
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Revitalize Your Floors with Precision Concrete Grinding and Polishing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 15 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-disinfection-services.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        DISINFECTION SERVICES
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Let's keep your business clean but also healthy and free of germs and bacteria.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 16 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-emergency.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        EMERGENCY CLEANING SERVICES
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Rapid Response Emergency Cleaning Services When You Need Us Most.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 17 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-Upholstery.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        UPHOLSTERY
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Whether it's couches, chairs or even cubicles walls - We can get your organization's UPHOLSTERY back to clean.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 18 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-carpet-maintenance.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        CARPET MAINTENANCE
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Vacuuming is not enough to keep your carpets clean.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 19 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-hard-floor.jpeg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        HARD FLOOR MAINTENANCE
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Tailored Hard Floor Maintenance Services for Every Surface Type.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 20 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-snow-removing.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        SNOW Removing
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Keep your business safe and accessible all winter long!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 21 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-[url('/assets/images/offer-landscaping.jpg')] bg-cover bg-center"></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        LandSCaping Services
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        First impressions start outside. Our professional landscaping services keep your property looking pristine, welcoming, and well-maintained year-round
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 21 */}
                        <div className="group relative bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-6">
                                <div className="relative w-52 h-52 rounded-l-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src="/assets/images/painting.jpg"
                                        alt="Paint and Drywall"
                                        width={208}
                                        height={208}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-3">
                                        Paint and drywall
                                    </h3>
                                    <p className="text-gray-700 text-base leading-relaxed">
                                        Precision in Every Wall, Perfection in Every Coat
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