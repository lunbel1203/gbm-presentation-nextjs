import React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ReferProgram () {
    
    useGSAP(() => {
        // ScrollTrigger para las animaciones secuenciales
        ScrollTrigger.create({
            trigger: '.referTrigger',
            start: 'top top',
            end: '+=3000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                    const progress = self.progress;
                    
                    // Fase 1: Title (0% - 25%)
                    if (progress <= 0.25) {
                        const titleProgress = progress / 0.25;
                        gsap.set('.title', {
                            y: gsap.utils.interpolate(100, 0, titleProgress),
                            opacity: titleProgress
                        });
                    }
                    
                    // Fase 2: Image (25% - 50%)
                    else if (progress <= 0.5) {
                        const imageProgress = (progress - 0.25) / 0.25;
                        gsap.set('.title', { y: 0, opacity: 1 });
                        gsap.set('.sectionImg', {
                            x: gsap.utils.interpolate(-200, 0, imageProgress),
                            opacity: imageProgress
                        });
                    }
                    
                    // Fase 3: Refer Text (50% - 75%)
                    else if (progress <= 0.75) {
                        const textProgress = (progress - 0.5) / 0.25;
                        gsap.set('.title', { y: 0, opacity: 1 });
                        gsap.set('.sectionImg', { x: 0, opacity: 1 });
                        gsap.set('.refer-text', {
                            x: gsap.utils.interpolate(200, 0, textProgress),
                            opacity: textProgress
                        });
                    }
                    
                    // Fase 4: Transición a Instructions (75% - 100%)
                    else {
                        gsap.set('.title', { y: 0, opacity: 1 });
                        gsap.set('.sectionImg', { x: 0, opacity: 1 });
                        
                        // Subfase 4a: Fade out refer-text (75% - 87.5%)
                        if (progress <= 0.875) {
                            const fadeOutProgress = (progress - 0.75) / 0.125;
                            gsap.set('.refer-text', {
                                x: 0,
                                opacity: gsap.utils.interpolate(1, 0, fadeOutProgress)
                            });
                            // Mantener refer-instructions oculto
                            gsap.set('.refer-instructions', {
                                display: 'none',
                                opacity: 0,
                                x: 200
                            });
                        }
                        // Subfase 4b: Fade in refer-instructions (87.5% - 100%)
                        else {
                            const fadeInProgress = (progress - 0.875) / 0.125;
                            // Mantener refer-text oculto
                            gsap.set('.refer-text', { x: 0, opacity: 0 });
                            // Animar refer-instructions
                            gsap.set('.refer-instructions', {
                                display: 'block',
                                opacity: fadeInProgress,
                                x: gsap.utils.interpolate(200, 0, fadeInProgress)
                            });
                        }
                    }
                }
            });

        // Estado inicial
        gsap.set('.title', { y: 100, opacity: 0 });
        gsap.set('.sectionImg', { x: -200, opacity: 0 });
        gsap.set('.refer-text', { x: 200, opacity: 0 });
        gsap.set('.refer-instructions', { display: 'none', opacity: 0, x: 200 });

    }, []);

    return (
        <>
            <section id="refer-program" className="referTrigger w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="refer-section container mx-auto px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="title text-center my-16">
                        <h2 className="text-44xl lg:text-6xl font-black bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent uppercase mb-4">
                            REFER A CUSTOMER PROGRAM
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#194263] to-gbm-green mx-auto mb-8"></div>
                    </div>

                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="sectionImg w-full">
                            <img src="/assets/images/refer-program.jpg" alt="Refer Program" className="w-full h-150 object-cover rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full flex items-center gap-5 relative">
                            <div className="refer-text flex flex-col gap-5">
                                <h1 className="text-4xl lg:text-5xl text-[#193263] font-bold mb-4">REFER A CUSTOMER PROGRAM</h1>
                                <div className="text-xl space-y-4 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                                    <p>
                                        We want to Thank You for spreading Our good name and that is why Glaring Building
                                        Maintenance will pay you Six Hundred dollar ($600.00) when you refer a new customer to
                                        us.!
                                    </p>
                                    <p>
                                        Ask your friends, relatives, vendors, coworkers, or clients if they would like improved
                                        cleanliness at their workplace! Then email us their information and we will take care of
                                        the rest! You can look forward to receiving a $600.00 check* after they start receiving
                                        our services. It’s that simple!
                                    </p>
                                    <p>
                                        Bonus is payable if company referred has at least 10 employees and will be paid after
                                        GBM provides 30 days of services to the new client.
                                    </p>
                                </div>
                                
                            </div>
                            <div className="refer-instructions absolute top-0 left-0 w-full flex flex-col gap-5 bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold">
                                <h2 className="text-3xl lg:text-5xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent font-bold mb-4">How to take part?</h2>
                                <h3 className="text-3xl text-gbm-green font-bold mb-4">Send an email with:</h3>
                                <ul className="space-y-2 text-xl bg-gradient-to-r from-[#194263] to-gbm-green bg-clip-text text-transparent">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-gbm-green rounded-full mr-3"></span>
                                        Your Name
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-gbm-green rounded-full mr-3"></span>
                                        Your Company's name
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-gbm-green rounded-full mr-3"></span>
                                        Your Telephone Number
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-gbm-green rounded-full mr-3"></span>
                                        Your Email
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-gbm-green rounded-full mr-3"></span>
                                        Referral's Name
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-gbm-green rounded-full mr-3"></span>
                                        Referral's Email
                                    </li>
                                </ul>
                                <p className="text-lg text-gbm-green font-bold mt-4">
                                    To: contactus@glaringmaintenance.com
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}