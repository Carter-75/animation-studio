'use client';

import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatterBackground from '@/components/MatterBackground';
import animations from '@/animations';

export default function HomePage() {
    const [headerVisible, setHeaderVisible] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientY } = event;
            const threshold = 30; // 30px from the edge

            // Show header
            if (clientY <= threshold) {
                setHeaderVisible(true);
            } else {
                setHeaderVisible(false);
            }

            // Show footer
            if (window.innerHeight - clientY <= threshold) {
                setFooterVisible(true);
            } else {
                setFooterVisible(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const animationCount = animations.length;
    let gridClass = '';
    if (animationCount === 1) gridClass = 'grid-1';
    else if (animationCount === 2) gridClass = 'grid-2';
    else if (animationCount === 3) gridClass = 'grid-3';
    else if (animationCount >= 4) gridClass = 'grid-4';

    return (
        <>
            <MatterBackground />
            <Header style={{ transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)' }} />
            <main>
                <div className={`animation-grid ${gridClass}`}>
                    {animations.map((anim) => {
                        const AnimationComponent = anim.component;
                        return (
                            <div key={anim.name} className="animation-container">
                                <AnimationComponent />
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer style={{ transform: footerVisible ? 'translateY(0)' : 'translateY(100%)' }} />
        </>
    );
} 