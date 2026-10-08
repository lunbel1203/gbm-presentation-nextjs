import React from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';



export default function Intro() {

    useGSAP(() => {
        const introTimeLine = gsap.timeline();

        introTimeLine
            // Logo entrance
            .fromTo('.logo',
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
            )
            // Logo exit
            .to('.logo',
                { opacity: 0, scale: 1.2, duration: 0.5, ease: 'power2.in' }
            )
            // Welcome text entrance
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
                { scale: 0.6, opacity: 1, y: -300, duration: 0.5 }, 0
            )
            .to('.logo',
                { opacity: 0, scale: 0.3, duration: 0.5 }, 0.5
            )
            .fromTo(['.welcome', '.subTitle'],
                { opacity: 1 },
                { opacity: 0, duration: 1 }, 0
            )
            .fromTo('.thank-section',
                { opacity: 0, y: 100 },
                { opacity: 1, y: 30, duration: 1 }, 1.5
            );

    }, []);


    return (
        <section id="intro" className="introTrigger w-full h-screen bg-[url('/assets/images/bg-building.jpg')] bg-cover bg-center text-white relative">
            <div className="overlay absolute inset-0 w-full h-full">
                <div className="container h-full mx-auto flex flex-col flex-wrap justify-center items-center text-center">
                    <div className='absolute w-full lg:w-5/6 px-5'>
                        <h1 className='welcome text-3xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight'>WELCOME TO GLARING BUILDING MAINTENANCE</h1>
                        <p className='subTitle text-xl md:text-3xl lg:text-5xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)]'>All-In-One Facility Solutions</p>
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
                    <div className="thank-section w-full lg:w-5/6 mx-auto text-center px-5 mt-20">
                        <div className="mb-10">
                            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold text-white mb-5">We appreciate the opportunity to introduce Glaring Building Maintenance and show you a better way to manage your facility.</h2>
                            <div className="w-32 md:w-52 h-1 bg-gbm-green mx-auto"></div>
                        </div>
                        <p className="w-full sm:w-4/6 text-sm md:text-base lg:text-xl mx-auto leading-relaxed text-gray-200 mb-5">
                            For more than 20 years, we've helped organizations maintain cleaner, safer and better-performing properties through reliable in-house facility solutions.
                        </p>
                        <p className="w-full sm:w-4/6 text-base md:text-xl lg:text-3xl font-bold mx-auto leading-relaxed text-white">
                            One partner. One point of contact. One standard.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}