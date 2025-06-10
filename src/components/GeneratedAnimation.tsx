'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { AnimationSettings } from '@/animations';

interface GeneratedAnimationProps {
    settings: AnimationSettings;
}

const GeneratedAnimation: React.FC<GeneratedAnimationProps> = ({ settings }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<anime.AnimeTimelineInstance | anime.AnimeInstance | null>(null);

    const getShapePath = (shape: AnimationSettings['shape']) => {
        switch (shape) {
            case 'square':
                return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
            case 'triangle':
                return 'polygon(50% 0%, 0% 100%, 100% 100%)';
            case 'star':
                return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            case 'circle':
            default:
                return 'circle(50% at 50% 50%)';
        }
    };

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.pause();
        }
        
        const container = containerRef.current;
        if (!container) return;

        anime.remove(container.children);
        container.innerHTML = '';
        container.style.backgroundColor = settings.backgroundColor || '#111';

        const elements = [];
        for (let i = 0; i < settings.count; i++) {
            const el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.width = `${settings.size}px`;
            el.style.height = `${settings.size}px`;
            el.style.left = `${Math.random() * 100}%`;
            el.style.top = `${Math.random() * 100}%`;
            el.style.backgroundColor = settings.colorPalette[i % settings.colorPalette.length];
            el.style.clipPath = getShapePath(settings.shape);
            container.appendChild(el);
            elements.push(el);
        }

        const commonParams: anime.AnimeParams = {
            targets: elements,
            easing: settings.easing,
            duration: settings.duration,
            loop: true,
        };

        switch (settings.motion) {
            case 'swirl':
                animationRef.current = anime.timeline(commonParams)
                    .add({
                        translateX: (el: HTMLElement, i: number) => Math.sin(i) * (container.offsetWidth / 4),
                        translateY: (el: HTMLElement, i: number) => Math.cos(i) * (container.offsetHeight / 4),
                        rotate: 360,
                        scale: [1, 1.5, 1],
                        delay: anime.stagger(10),
                    });
                break;
            case 'explode':
                animationRef.current = anime.timeline(commonParams)
                    .add({
                        translateX: () => anime.random(-container.offsetWidth / 2, container.offsetWidth / 2),
                        translateY: () => anime.random(-container.offsetHeight / 2, container.offsetHeight / 2),
                        scale: [0, 1],
                        opacity: [1, 0],
                        delay: anime.stagger(5),
                    });
                break;
            case 'fall':
                animationRef.current = anime({
                    ...commonParams,
                    translateY: [anime.stagger(-200, {start: -settings.size}), container.offsetHeight + settings.size],
                    delay: anime.stagger(settings.duration / settings.count),
                });
                break;
             case 'float':
                animationRef.current = anime({
                    ...commonParams,
                    translateY: [container.offsetHeight + settings.size, -settings.size],
                    translateX: () => `+=${anime.random(-50, 50)}`,
                    delay: anime.stagger(settings.duration / settings.count),
                });
                break;
            case 'grid-stagger':
                 animationRef.current = anime.timeline(commonParams)
                    .add({
                        translateX: anime.stagger(settings.size, {grid: [Math.floor(container.offsetWidth/settings.size),Math.floor(container.offsetHeight/settings.size)], from: 'center', axis: 'x'}),
                        translateY: anime.stagger(settings.size, {grid: [Math.floor(container.offsetWidth/settings.size),Math.floor(container.offsetHeight/settings.size)], from: 'center', axis: 'y'}),
                        rotateZ: anime.stagger([0, 90], {grid: [10,10], from: 'center', axis: 'x'}),
                    });
                break;
        }

        return () => {
             if (animationRef.current) {
                animationRef.current.pause();
                anime.remove(container.children);
            }
        };

    }, [settings]);

    return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }} />;
};

export default GeneratedAnimation; 