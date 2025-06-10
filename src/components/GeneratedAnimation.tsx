'use client';

import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import { AnimationSettings } from '@/animations';

interface GeneratedAnimationProps {
    settings: AnimationSettings;
    isZoomed: boolean;
}

const GeneratedAnimation: React.FC<GeneratedAnimationProps> = ({ settings, isZoomed }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLElement[]>([]);

    // Helper for color interpolation
    const lerpColor = (c1Hex: string, c2Hex: string, factor: number) => {
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
        };
        const c1 = hexToRgb(c1Hex);
        const c2 = hexToRgb(c2Hex);
        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const getParticleColor = (index: number) => {
        const { colorPalette, colorStrategy } = settings;
        if (!colorPalette || colorPalette.length === 0) return '#FFF';
        switch (colorStrategy) {
            case 'solid': return colorPalette[0];
            case 'palette-sequence': return colorPalette[index % colorPalette.length];
            case 'random-lerp': return lerpColor(colorPalette[0], colorPalette[1] || colorPalette[0], Math.random());
            default: return colorPalette[anime.random(0, colorPalette.length - 1)];
        }
    };

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const newParticles = [];
        const { width, height } = container.getBoundingClientRect();

        const animateParticle = (p: HTMLElement) => {
            const currentContainer = containerRef.current;
            if (!currentContainer) return;
            const { width: w, height: h } = currentContainer.getBoundingClientRect();
            
            const animParams: anime.AnimeParams = {
                targets: p,
                translateX: anime.random(0, w),
                translateY: anime.random(0, h),
                duration: anime.random(settings.motionDuration * 0.8, settings.motionDuration * 1.2),
                easing: settings.motionEasing || 'linear',
                complete: () => animateParticle(p),
            };

            anime(animParams);
        };

        for (let i = 0; i < settings.particleCount; i++) {
            const el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.backgroundColor = getParticleColor(i);
            el.style.width = `${settings.particleSize}px`;
            el.style.height = `${settings.particleSize}px`;

            // Handle shapes
            if (settings.particleShape === 'circle') {
                el.style.borderRadius = '50%';
            } else if (settings.particleShape === 'triangle') {
                el.style.width = '0';
                el.style.height = '0';
                el.style.borderLeft = `${settings.particleSize / 2}px solid transparent`;
                el.style.borderRight = `${settings.particleSize / 2}px solid transparent`;
                el.style.borderBottom = `${settings.particleSize}px solid ${getParticleColor(i)}`;
                el.style.backgroundColor = 'transparent';
            } else if (settings.particleShape === 'line') {
                 el.style.width = `${settings.particleSize / 5}px`;
                 el.style.height = `${settings.particleSize}px`;
            }

            // Fix: Assign a random starting position immediately
            const startX = anime.random(0, width);
            const startY = anime.random(0, height);
            el.style.transform = `translate(${startX}px, ${startY}px)`;
            
            fragment.appendChild(el);
            newParticles.push(el);
        }
        container.appendChild(fragment);
        particlesRef.current = newParticles;

        particlesRef.current.forEach(p => {
             setTimeout(() => animateParticle(p), anime.random(0, settings.motionDuration));
        });

        return () => {
            if (particlesRef.current.length > 0) {
                anime.remove(particlesRef.current);
                particlesRef.current = [];
            }
            if(containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [settings]);

    // Background Styling
    const backgroundStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: settings.backgroundColor,
    };

    return <div ref={containerRef} className="animation-canvas" style={backgroundStyle} />;
};

export default GeneratedAnimation; 