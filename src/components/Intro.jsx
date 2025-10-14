import React from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';



export default function Intro () {

    useGSAP (() => {
        const introTimeLine = gsap.timeline();

        introTimeLine
            .from('.welcome', {
                opacity: 0,
                y: 100,
                duration: 1.5,
                ease: 'power2.out'
            })
            .from('.subTitle', {
                opacity: 0,
                y: 100,
                duration: 1.2,
                filter: 'blur(10px)',
                ease: 'elastic.out(1,0.6)'
            })

        const scrollTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '.introTrigger',
                start: 'top top',
                end: '+=3000',
                scrub: true,
                pin: true,
                pinSpacing: true
            }
        });

        scrollTimeLine
            .fromTo('.overlay',
                { backgroundColor: 'rgba(25, 50, 99, 0)' },
                { backgroundColor: 'rgba(25, 50, 99, 0.8)', duration: 1 }
            )
            .fromTo('.logo',
                { scale: 5, opacity: 0, y: 0 },
                { scale: 0.6, opacity: 1, y: -300, duration: 1 }, 0
            )
            .fromTo(['.welcome', '.subTitle'],
                { opacity: 1 },
                { opacity: 0, duration: 1 }, 0
            )
            .fromTo('.thank-section',
                { opacity: 0, y: 100 },
                { opacity: 1, y: 30, duration: 1 }, 1
            );

    }, []);


    return (
        <section id="intro" className="introTrigger w-full h-screen bg-[url('/assets/images/bg-building.jpg')] bg-cover bg-center text-white relative">
            <div className="overlay absolute inset-0 w-full h-full">
                <div className="container h-full mx-auto flex justify-center items-center text-center">
                    <div className='absolute'>
                        <h1 className='welcome text-4xl md:text-7xl lg:text-[180px] font-black bg-gradient-to-r from-gbm-green to-gbm-blue bg-clip-text text-transparent mb-4'>BIENVENIDO</h1>
                        <p className='subTitle text-2xl md:text-4xl text-white font-bold'>A nuestra presentación</p>
                    </div>
                    <Image
                        className="logo w-5/6 lg:w-1/4 absolute"
                        alt="Glaring Building Maintenance"
                        src="/assets/images/logo-white.png"
                        width={400}
                        height={200}
                        priority
                        sizes="(max-width: 768px) 83vw, 25vw"
                    />
                    <div className="thank-section w-full lg:w-4/6 text-center px-5 mt-20">
                        <div className="mb-10">
                            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-white mb-5">Gracias por permitir a Glaring Building Maintenance (GBM) la oportunidad de presentar una propuesta.</h2>
                            <div className="w-32 md:w-52 h-1 bg-gbm-green mx-auto"></div>
                        </div>
                        <div className="content grid gap-6">
                            <p className="w-full sm:w-4/6 text-sm md:text-base lg:text-xl mx-auto leading-relaxed text-gray-200">
                                En GBM, la seguridad, el bienestar de sus visitantes y colaboradores constituyen el eje central de nuestras operaciones. Ofrecemos servicios confiables y de alto nivel que respaldan sus objetivos institucionales, garantizando entornos limpios, seguros y en óptimas condiciones.
                            </p>
                            <p className="w-full sm:w-4/6 text-sm md:text-base lg:text-xl mx-auto leading-relaxed text-gray-200">
                                Nuestro equipo opera los siete días de la semana y se ajusta a sus necesidades operativas, con supervisión constante en sitio e inspecciones programadas que aseguran el cumplimiento de los más altos estándares de calidad.
                            </p>
                            <p className="w-full sm:w-4/6 text-sm md:text-base lg:text-xl mx-auto leading-relaxed text-gray-200">
                                Por favor, tenga en cuenta que, debido a las variaciones en los costos de materiales, transporte y mano de obra, todas las cotizaciones tendrán una validez de treinta (30) días a partir de la fecha de emisión.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}