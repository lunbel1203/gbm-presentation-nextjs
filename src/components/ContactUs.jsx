import React from 'react'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react';
import {
    RiMapPinLine,
    RiGlobalLine,
    RiMailLine,
    RiInstagramLine,
    RiFacebookLine,
    RiLinkedinLine,
    RiYoutubeLine
} from '@remixicon/react'

export default function ContactUs () {
    
    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // ScrollTrigger para las animaciones secuenciales
        createOptimizedScrollTrigger({
            trigger: '.contactUsTrigger',
            start: 'top top',
            end: '+=4000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Fase 1: Title mejorado (0% - 20%)
                if (progress <= 0.2) {
                    const titleProgress = progress / 0.2;
                    const smoothProgress = gsap.utils.interpolate(0, 1, Math.pow(titleProgress, 0.7));
                    gsap.set('.contactus-title-container', {
                        y: gsap.utils.interpolate(100, 0, smoothProgress),
                        opacity: smoothProgress,
                        scale: gsap.utils.interpolate(0.8, 1, smoothProgress),
                        rotateX: gsap.utils.interpolate(45, 0, smoothProgress),
                        transform: `translateY(${gsap.utils.interpolate(100, 0, smoothProgress)}px) scale(${gsap.utils.interpolate(0.8, 1, smoothProgress)}) rotateX(${gsap.utils.interpolate(45, 0, smoothProgress)}deg)`
                    });
                    // Mantener todos los contact-items ocultos durante la fase del título
                    gsap.set('.contact-item', { x: -200, opacity: 0, scale: 0.8 });
                    // Mantener la sección de Branches oculta
                    gsap.set('.branches-title', { y: 100, opacity: 0 });
                    gsap.set('.branch-item', { x: -200, opacity: 0, scale: 0.8 });
                }
                
                // Fase 2: Animar los li uno por uno (20% - 60%)
                else if (progress > 0.2 && progress <= 0.6) {
                    gsap.set('.contactus-title-container', {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        transform: 'translateY(0px) scale(1) rotateX(0deg)'
                    });
                    
                    const contactItems = gsap.utils.toArray('.contact-item');
                    const itemAnimationDuration = 0.4 / contactItems.length; // 40% del tiempo dividido entre los items
                    
                    contactItems.forEach((item, index) => {
                        const itemStartProgress = 0.2 + (index * itemAnimationDuration);
                        const itemEndProgress = itemStartProgress + itemAnimationDuration;
                        
                        if (progress < itemStartProgress) {
                            // Antes de que empiece la animación del item, mantenerlo oculto
                            gsap.set(item, { x: -200, opacity: 0, scale: 0.8 });
                        } else if (progress >= itemStartProgress && progress <= itemEndProgress) {
                            // Durante la animación del item
                            const itemProgress = (progress - itemStartProgress) / itemAnimationDuration;
                            gsap.set(item, {
                                x: gsap.utils.interpolate(-200, 0, itemProgress),
                                opacity: itemProgress,
                                scale: gsap.utils.interpolate(0.8, 1, itemProgress)
                            });
                        } else if (progress > itemEndProgress) {
                            // Después de que termine la animación del item
                            gsap.set(item, { x: 0, opacity: 1, scale: 1 });
                        }
                    });
                    
                    // Mantener la sección de Branches oculta
                    gsap.set('.branches-title', { y: 100, opacity: 0 });
                    gsap.set('.branch-item', { x: -200, opacity: 0, scale: 0.8 });
                }
                
                // Fase 3: Animar el título de Branches (60% - 70%)
                else if (progress > 0.6 && progress <= 0.7) {
                    // Mantener los contact-items visibles
                    gsap.set('.contact-item', { x: 0, opacity: 1, scale: 1 });
                    
                    // Animar el título de Branches
                    const branchesTitleProgress = (progress - 0.6) / 0.1;
                    gsap.set('.branches-title', {
                        y: gsap.utils.interpolate(100, 0, branchesTitleProgress),
                        opacity: branchesTitleProgress
                    });
                    
                    // Mantener los branch-items ocultos
                    gsap.set('.branch-item', { x: -200, opacity: 0, scale: 0.8 });
                }
                
                // Fase 4: Animar los branch-items uno por uno (70% - 100%)
                else {
                    // Mantener los contact-items y el título de Branches visibles
                    gsap.set('.contact-item', { x: 0, opacity: 1, scale: 1 });
                    gsap.set('.branches-title', { y: 0, opacity: 1 });
                    
                    const branchItems = gsap.utils.toArray('.branch-item');
                    const branchItemAnimationDuration = 0.3 / branchItems.length; // 30% del tiempo dividido entre los items
                    
                    branchItems.forEach((item, index) => {
                        const itemStartProgress = 0.7 + (index * branchItemAnimationDuration);
                        const itemEndProgress = itemStartProgress + branchItemAnimationDuration;
                        
                        if (progress < itemStartProgress) {
                            // Antes de que empiece la animación del item, mantenerlo oculto
                            gsap.set(item, { x: -200, opacity: 0, scale: 0.8 });
                        } else if (progress >= itemStartProgress && progress <= itemEndProgress) {
                            // Durante la animación del item
                            const itemProgress = (progress - itemStartProgress) / branchItemAnimationDuration;
                            gsap.set(item, {
                                x: gsap.utils.interpolate(-200, 0, itemProgress),
                                opacity: itemProgress,
                                scale: gsap.utils.interpolate(0.8, 1, itemProgress)
                            });
                        } else if (progress > itemEndProgress) {
                            // Después de que termine la animación del item
                            gsap.set(item, { x: 0, opacity: 1, scale: 1 });
                        }
                    });
                }
            }
        });

        // Estado inicial
        gsap.set('.contactus-title-container', { y: 100, opacity: 0, scale: 0.8, rotateX: 45 });
        gsap.set('.contact-item', { x: -200, opacity: 0, scale: 0.8 });
        gsap.set('.branches-title', { y: 100, opacity: 0 });
        gsap.set('.branch-item', { x: -200, opacity: 0, scale: 0.8 });

    }, []);

    return (
        <>
            <section id="contact-us" className="contactUsTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="contactUs-section container mx-auto px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="contactus-title-container text-center my-16" style={{perspective: '1000px'}}>
                        <h2 className="text-44xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4 leading-tight" style={{transformStyle: 'preserve-3d'}}>
                            SERVICIOS DE LIMPIEZA ESPECIALIZADOS PARA INSTALACIONES COMERCIALES
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                    </div>

                    <div className="w-full max-w-6xl mx-auto items-center">
                        
                        <div className="w-full flex flex-wrap justify-center items-center bg-[length:500px] bg-small bg-right-top bg-no-repeat gap-10">
                            <div className="sectionImg w-5/6">
                                <ul className="flex flex-wrap justify-center gap-5">
                                    <li className="contact-item w-[calc(100%/2-20px)]">
                                        <a href="https://glaringmaintenance.com" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiGlobalLine color='white' size={24} />
                                            </div>
                                            <span>www.glaringmaintenance.com</span>
                                        </a>
                                    </li>
                                    <li className="contact-item w-[calc(100%/2-20px)]">
                                        <a href="mailto:contactus@glaringmaintenance.com" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiMailLine color='white' size={24} />
                                            </div>
                                            <span>contactus@glaringmaintenance.com</span>
                                        </a>
                                    </li>
                                    <li className="contact-item w-[calc(100%/2-20px)]">
                                        <a href="https://www.instagram.com/glaringmaintenance/" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiInstagramLine color='white' size={24} />
                                            </div>
                                            <span>@glaringmaintenance</span>
                                        </a>
                                    </li>
                                    <li className="contact-item w-[calc(100%/2-20px)]">
                                        <a href="https://web.facebook.com/people/Glaring-Building-Maintenance/100024269706981/" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiFacebookLine color='white' size={24} />
                                            </div>
                                            <span>@glaringmaintenance</span>
                                        </a>
                                    </li>
                                    <li className="contact-item w-[calc(100%/2-20px)]">
                                        <a href="https://www.linkedin.com/company/glaring-building-maintenance-corp?trk=ppro_cprof" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiLinkedinLine color='white' size={24} />
                                            </div>
                                            <span>@glaringBuildingmaintenance</span>
                                        </a>
                                    </li>
                                    <li className="contact-item w-[calc(100%/2-20px)]">
                                        <a href="https://www.youtube.com/channel/UCQakCiD3hIMkboJAFuRAIUw" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiYoutubeLine color='white' size={24} />
                                            </div>
                                            <span>@glaringmaintenance1</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="sectionImg w-5/6">
                                <h3 className='branches-title text-4xl mb-5 text-center bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold uppercase'>Sucursales</h3>
                                <ul className="flex flex-wrap justify-center gap-5">
                                    <li className="branch-item w-[calc(100%/2-20px)]">
                                        <a href="https://www.google.com/maps/place/76+Merrimack+St+6+6b,+Haverhill,+MA+01830,+USA/@42.7745464,-71.0810924,17z/data=!3m1!4b1!4m5!3m4!1s0x89e302348940d777:0x1305baa325a35dc1!8m2!3d42.7745464!4d-71.0785121!5m1!1e1?authuser=0&entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiMapPinLine color='white' size={24} />
                                            </div>
                                            <span>76 Merrimack street, suite 6-6B Haverhill MA 01830</span>
                                        </a>
                                    </li>
                                    <li className="branch-item w-[calc(100%/2-20px)]">
                                        <a href="https://glaringmaintenance.com" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiMapPinLine color='white' size={24} />
                                            </div>
                                            <span>1132 Us Route 1, Suite 3, York ME 03909</span>
                                        </a>
                                    </li>
                                    <li className="branch-item w-[calc(100%/2-20px)]">
                                        <a href="https://www.google.com/maps/place/Residencial+imperial+506/@18.4505418,-69.965853,17z/data=!3m1!4b1!4m6!3m5!1s0x8ea561f6cd4e342f:0xe446490026340b85!8m2!3d18.4505418!4d-69.9632727!16s%2Fg%2F11bxg102xt!5m1!1e1?authuser=0&entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="flex items-center text-xl font-bold gap-5 border-2 border-[#193263] rounded-full">
                                            <div className="min-h-[4rem] min-w-[4rem] h-16 w-16 flex justify-center items-center bg-gradient-to-r from-[#194263] to-gbm-green rounded-[50%] aspect-square overflow-hidden">
                                                <RiMapPinLine color='white' size={24} />
                                            </div>
                                            <span>Av. 27 de Febrero, #506, Distrito Nacional, R.D.</span>
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}