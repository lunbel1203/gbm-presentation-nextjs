import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { gsap, createOptimizedScrollTrigger } from '../lib/gsap'
import { useGSAP } from '@gsap/react'
import { RiMenuLine, RiCloseLine } from '@remixicon/react'



export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const menuItems = [
        { id: 'intro', label: 'Welcome', href: '#intro' },
        { id: 'about-us', label: 'About Us', href: '#about-us' },
        { id: 'mission', label: 'Mission', href: '#mission' },
        { id: 'vision', label: 'Vision', href: '#vision' },
        { id: 'values', label: 'Values', href: '#values' },
        { id: 'glaring-clean', label: 'Is Glaring Clean', href: '#glaring-clean' },
        { id: 'our-people', label: 'Our Greatest Asset', href: '#our-people' },
        { id: 'worker-compensation', label: 'Workers Compensation', href: '#worker-compensation' },
        { id: 'choose-us', label: 'Why Choose Us', href: '#choose-us' },
        { id: 'security-system', label: 'Security System', href: '#security-system' },
        { id: 'contingency-plan', label: 'Contingency Plan', href: '#contingency-plan' },
        { id: 'ourWork', label: 'Our Work', href: '#ourWork' },
        { id: 'quality-assurance', label: 'Quality Assurance', href: '#quality-assurance' },
        { id: 'cross-contamination', label: 'Cross Contamination', href: '#cross-contamination' },
        { id: 'tasks-organization', label: 'Tasks Organization', href: '#tasks-organization' },
        { id: 'equipment', label: 'Equipment', href: '#equipment' },
        { id: 'sponsor', label: 'Sponsor', href: '#sponsor' },
        { id: 'fundation', label: 'Fundation', href: '#fundation' },
        { id: 'we-offer', label: 'What We Offer', href: '#we-offer' },
        { id: 'glaringStandard', label: 'The Glaring Standard', href: '#glaringStandard' },
        { id: 'certificates', label: 'Our Certifications', href: '#certificates' },
        { id: 'we-serve', label: 'Area of Service', href: '#we-serve' },
        { id: 'refer-program', label: 'Refer Program', href: '#refer-program' },
        { id: 'contact-us', label: 'Contact Us', href: '#contact-us' },
        { id: 'thank-you', label: 'Thank You', href: '#thank-you' }
    ];

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        // Animacion inicial del menu
        gsap.set('.nav-menu', { x: '100%' });
        gsap.set('.nav-item', { x: 50, opacity: 0 });
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        
        if (!isOpen) {
            // Abrir menu
            gsap.to('.nav-menu', {
                x: '0%',
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to('.nav-item', {
                x: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                delay: 0.1,
                ease: "power2.out"
            });
        } else {
            // Cerrar menu
            gsap.to('.nav-item', {
                x: 50,
                opacity: 0,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.in"
            });
            
            gsap.to('.nav-menu', {
                x: '100%',
                duration: 0.3,
                delay: 0.1,
                ease: "power2.in"
            });
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            setActiveSection(sectionId);
            toggleMenu(); // Cerrar menu despues de navegar
        }
    };

    // Detectar seccion activa mientras se hace scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = menuItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(menuItems[index].id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Menu Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-[#194263] to-gbm-green rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
                {isOpen ? (
                    <RiCloseLine color="white" size={24} />
                ) : (
                    <RiMenuLine color="white" size={24} />
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 z-40"
                    onClick={toggleMenu}
                />
            )}

            {/* Navigation Menu */}
            <nav className="nav-menu fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 overflow-y-auto">
                <div className="p-8 pt-20">
                    
                    {/* Logo */}
                    <div className="mb-12 text-center">
                        <Image
                            src="/assets/images/logo-normal.png"
                            alt="GBM Logo"
                            width={200}
                            height={64}
                            className="h-16 mx-auto object-contain"
                        />
                    </div>

                    {/* Menu Items */}
                    <ul className="space-y-4">
                        {menuItems.map((item) => (
                            <li key={item.id} className="nav-item">
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 font-medium text-lg ${
                                        activeSection === item.id
                                            ? 'bg-gradient-to-r from-[#194263] to-gbm-green text-white shadow-lg'
                                            : 'text-[#194263] hover:bg-gray-100 hover:translate-x-2'
                                    }`}
                                >
                                    <span className="flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-4 ${
                                            activeSection === item.id ? 'bg-white' : 'bg-gbm-green'
                                        }`}></span>
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            GBM Presentation
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Your Property is Our Priority
                        </p>
                    </div>

                </div>
            </nav>
        </>
    );
}