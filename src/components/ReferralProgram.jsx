import React from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'
import { useGSAP } from '@gsap/react'

export default function ReferralProgram() {
    useGSAP(() => {
        if (typeof window === 'undefined') return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.referralTrigger',
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: 1.5
            }
        });

        tl.fromTo('.referral-head', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
            .fromTo('.referral-body', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
            .fromTo('.referral-reward', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' })
            .fromTo('.referral-foot', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
    }, []);

    return (
        <section id="referral" className="referralTrigger w-full h-screen bg-gbm-blue text-white relative">
            <div className="container h-full mx-auto flex flex-col justify-center px-10">
                <div className="referral-head">
                    <p className="text-sm lg:text-lg tracking-[0.4em] uppercase text-gray-200">Exclusive Client Benefits</p>
                    <div className="w-24 h-1 bg-gbm-green mt-4 mb-6"></div>
                    <h2 className="text-4xl lg:text-7xl font-black leading-tight">
                        Great Partnerships<br />Deserve <span className="text-gbm-green">Great Rewards.</span>
                    </h2>
                </div>

                <div className="referral-body mt-8 max-w-4xl">
                    <p className="text-lg lg:text-2xl mb-4">Your trust means everything. Your referrals deserve recognition.</p>
                    <p className="text-base lg:text-xl text-gray-200 leading-relaxed">
                        When you recommend Glaring Building Maintenance to another business and they become a contracted client, we thank you with an exclusive referral reward.
                    </p>
                </div>

                <div className="referral-reward text-center mt-6">
                    <p className="text-6xl lg:text-9xl font-black">$1,000</p>
                    <p className="text-xl lg:text-3xl font-bold tracking-[0.3em] text-gbm-green uppercase">Referral Reward</p>
                </div>

                <div className="referral-foot text-center mt-6">
                    <div className="w-1/3 h-px bg-white/40 mx-auto mb-4"></div>
                    <p className="text-lg lg:text-xl font-bold">One introduction. A rewarding partnership.</p>
                    <p className="text-xs lg:text-sm text-gray-300 mt-2 max-w-3xl mx-auto">
                        Reward available for qualifying referrals after the referred business signs a service agreement and completes its first payment. Additional terms apply.
                    </p>
                    <Image src="/assets/images/logo-white.png" alt="Glaring Building Maintenance" width={200} height={100} className="w-36 h-auto mx-auto mt-4" />
                </div>
            </div>
        </section>
    )
}
