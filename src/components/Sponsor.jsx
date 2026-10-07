import React, { useRef } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { useGSAP } from '@gsap/react'




export default function Sponsor () {

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sponsorTrigger',
                start: 'top top',
                end: '+=200%',
                pin: true,
                scrub: 1.5
            }
        });

        // Fade in del título
        tl.fromTo('.sponsor-title',
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
        )
        // Cards aparecen desde abajo con stagger
        .fromTo('.content-section',
            { y: window.innerHeight, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.inOut' },
            '-=0.5'
        )
        // Animar cada card individualmente
        .from('.card', {
            y: 80,
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.5)'
        }, '-=1');

    }, []);

    return (
        <>
            <section id="sponsor" className="sponsorTrigger w-full h-screen text-white relative">
                <div className="sponsor-section container h-full mx-auto flex justify-center items-center text-center gap-20">
                    <div className="sponsor-title w-[40%] text-left mx-auto">
                        <div className="mb-10">
                            <h2 className="text-2xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent mb-5 uppercase">Nuestro Cuidado Va Más Allá de los Edificios</h2>
                            <div className="w-52 h-1 bg-gbm-green"></div>
                        </div>
                        <p className="text-base lg:text-xl mx-auto leading-relaxed bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                            A través de Glaring Cares Foundation, apoyamos a las comunidades mediante programas de alcance, donaciones, iniciativas médicas y dentales y alianzas comunitarias en Estados Unidos y República Dominicana.
                        </p>
                    </div>
                    <div className="content-section w-[60%]">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="card rounded-lg overflow-hidden shadow-lg h-64 relative">
                                <Image
                                    src="/assets/images/sponsor.png"
                                    alt="Sponsor 1"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="card rounded-lg overflow-hidden shadow-lg h-64 relative">
                                <Image
                                    src="/assets/images/sponsor1.jpg"
                                    alt="Sponsor 2"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="card rounded-lg overflow-hidden shadow-lg h-64 relative">
                                <Image
                                    src="/assets/images/sponsor2.png"
                                    alt="Sponsor 3"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="card rounded-lg overflow-hidden shadow-lg h-64 relative">
                                <Image
                                    src="/assets/images/sponsor3.jpg"
                                    alt="Sponsor 4"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="card rounded-lg overflow-hidden shadow-lg h-64 relative">
                                <Image
                                    src="/assets/images/sponsor4.jpg"
                                    alt="Sponsor 5"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="card rounded-lg overflow-hidden shadow-lg h-64 relative">
                                <Image
                                    src="/assets/images/sponsor5.jpeg"
                                    alt="Sponsor 6"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}