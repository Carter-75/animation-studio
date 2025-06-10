'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeneratedAnimation from '@/components/GeneratedAnimation';
import MatterBackground from '@/components/MatterBackground';
import { useToast } from '@/context/ToastContext';
import { AnimationSettings, GeneratedAnimation as Animation } from '@/animations';
import * as Fallback from '@/animations/fallback-options';

const motionEasingOptions: AnimationSettings['motionEasing'][] = ['linear', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeOutCubic', 'easeInOutCubic'];

export default function HomePage() {
    const [animations, setAnimations] = useState<Animation[]>([]);
    const [zoomedAnimation, setZoomedAnimation] = useState<Animation | null>(null);
    const [lastZoomedAnimation, setLastZoomedAnimation] = useState<Animation | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isManageMode, setIsManageMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const { addToast } = useToast();

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientY } = event;
            const threshold = 60; // How close to the edge to trigger

            document.body.classList.toggle('header-active', clientY <= threshold);
            document.body.classList.toggle('footer-active', window.innerHeight - clientY <= threshold);
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        // Initial welcome toast - use sessionStorage to prevent double-toast in dev strict mode
        if (!sessionStorage.getItem('welcomeToastShown')) {
            try {
                const savedAnimations = localStorage.getItem('animations');
                if (savedAnimations) {
                    setAnimations(JSON.parse(savedAnimations));
                }
                addToast("Welcome! Describe an animation in the header to begin.", 'info');
                sessionStorage.setItem('welcomeToastShown', 'true');
            } catch (error) {
                console.error("Failed to load animations from localStorage", error);
            }
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.classList.remove('header-active', 'footer-active');
        };
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('animations', JSON.stringify(animations));
        } catch (error) {
            console.error("Failed to save animations to localStorage", error);
        }
    }, [animations]);

    const generateFallbackAnimation = (prompt: string): Animation => {
        const randomPalette = Fallback.colorPalettes[Fallback.getRandomInt(0, Fallback.colorPalettes.length - 1)];
        
        const settings: AnimationSettings = {
            particleShape: Fallback.getRandomOption(Fallback.particleShapeOptions),
            particleSize: Fallback.getRandomInt(5, 50),
            particleCount: Fallback.getRandomInt(50, 400),
            colorPalette: randomPalette,
            colorStrategy: Fallback.getRandomOption(Fallback.colorStrategyOptions),
            backgroundStyle: Fallback.getRandomOption(Fallback.backgroundStyleOptions),
            backgroundColor: randomPalette[Fallback.getRandomInt(0, randomPalette.length - 1)],
            motionPath: Fallback.getRandomOption(Fallback.motionPathOptions),
            motionDuration: Fallback.getRandomInt(4000, 15000),
            motionEasing: motionEasingOptions[Fallback.getRandomInt(0, motionEasingOptions.length - 1)],
            particleDistribution: Fallback.getRandomOption(Fallback.particleDistributionOptions),
            edgeCollision: Fallback.getRandomOption(Fallback.edgeCollisionOptions),
            rotationStyle: Fallback.getRandomOption(Fallback.rotationOptions),
            scaleBehaviour: Fallback.getRandomOption(Fallback.scaleBehaviourOptions),
            opacityBehaviour: Fallback.getRandomOption(Fallback.opacityBehaviourOptions),
        };

        return {
            id: uuidv4(),
            prompt: prompt || "A touch of randomness",
            settings: settings,
        };
    };

    const handleGenerate = async (prompt: string, useFallback = false) => {
        setIsGenerating(true);
        if (useFallback) {
            const newAnimation = generateFallbackAnimation(prompt);
            setAnimations(prev => [newAnimation, ...prev]);
            addToast("Generated a random animation!", 'info');
            setIsGenerating(false);
            return;
        }

        try {
            const response = await fetch('/api/generate-animation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const { settings } = await response.json();
            const newAnimation: Animation = { id: uuidv4(), prompt, settings };
            setAnimations(prev => [newAnimation, ...prev]);
            addToast("AI animation generated successfully!", 'success');
        } catch (error) {
            console.error("Failed to generate AI animation:", error);
            addToast("AI generation failed. Creating a random animation instead.", 'error');
            const fallbackAnimation = generateFallbackAnimation(prompt);
            setAnimations(prev => [fallbackAnimation, ...prev]);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleZoom = (animation: Animation) => {
        if (animations.length <= 1) return; // Disable zoom if only one animation

        if (zoomedAnimation?.id === animation.id) {
            setZoomedAnimation(null);
        } else {
            setZoomedAnimation(animation);
            setLastZoomedAnimation(animation);
        }
    };

    const handlePreviewClick = () => {
        if (lastZoomedAnimation) {
            handleZoom(lastZoomedAnimation);
        }
    };

    const toggleManageMode = () => {
        setIsManageMode(!isManageMode);
        setSelectedIds(new Set()); // Clear selection when toggling mode
    };

    const handleSelect = (id: string) => {
        if (!isManageMode) return;
        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setSelectedIds(newSelectedIds);
    };

    const handleDeleteSelected = () => {
        setAnimations(animations.filter(anim => !selectedIds.has(anim.id)));
        setSelectedIds(new Set());
    };

    const handleDeleteAll = () => {
        setAnimations([]);
        setSelectedIds(new Set());
        setZoomedAnimation(null);
    };

    const getGridStyle = (count: number): React.CSSProperties => {
        if (zoomedAnimation) return { gridTemplateColumns: '1fr' };
        if (count === 0) return {};
        if (count <= 3) {
            return {
                gridTemplateColumns: `repeat(${count}, 1fr)`,
                gridTemplateRows: `1fr`,
            };
        }
        const columns = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / columns);
        return {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
        };
    };

    const animationsToRender = zoomedAnimation ? [zoomedAnimation] : animations;

    return (
        <>
            <MatterBackground />
            <Header
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                isManageMode={isManageMode}
                onToggleManageMode={toggleManageMode}
                onDeleteSelected={handleDeleteSelected}
                onDeleteAll={handleDeleteAll}
                selectedCount={selectedIds.size}
                lastZoomedAnimation={lastZoomedAnimation}
                onPreviewClick={handlePreviewClick}
            />
            <main>
                <div className="animation-grid" style={getGridStyle(animations.length)}>
                    {animationsToRender.map((anim) => (
                        <div
                            key={anim.id}
                            className={`animation-container ${zoomedAnimation?.id === anim.id ? 'zoomed' : ''} ${selectedIds.has(anim.id) ? 'selected' : ''}`}
                            onClick={() => isManageMode ? handleSelect(anim.id) : handleZoom(anim)}
                        >
                            <GeneratedAnimation settings={anim.settings} isZoomed={zoomedAnimation?.id === anim.id} />
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
} 