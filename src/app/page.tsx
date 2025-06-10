'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatterBackground from '@/components/MatterBackground';
import { GeneratedAnimation as GeneratedAnimationType, AnimationSettings } from '@/animations';
import { predefinedAnimations } from '@/animations/predefined';
import GeneratedAnimation from '@/components/GeneratedAnimation';
import { useToast } from '@/context/ToastContext';

// Helper function to check for duplicate animation settings
const areSettingsEqual = (a: AnimationSettings, b: AnimationSettings) => {
    // A simple but effective way to deep compare objects
    return JSON.stringify(a) === JSON.stringify(b);
};

export default function HomePage() {
    const [animations, setAnimations] = useState<GeneratedAnimationType[]>([]);
    const [zoomedAnimation, setZoomedAnimation] = useState<GeneratedAnimationType | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const { addToast } = useToast();

    // Load animations from localStorage on initial render
    useEffect(() => {
        const savedAnimations = localStorage.getItem('generatedAnimations');
        if (savedAnimations) {
            setAnimations(JSON.parse(savedAnimations));
        }
    }, []);
    
    // Set up hover listeners and show initial toast
    useEffect(() => {
        const instructionalToast = () => {
             addToast("Describe an animation in the header and click Generate!");
        };

        const hasShownToast = sessionStorage.getItem('instructionalToastShown');
        if (!hasShownToast) {
            instructionalToast();
            sessionStorage.setItem('instructionalToastShown', 'true');
        }
        
        const handleMouseMove = (event: MouseEvent) => {
            const { clientY } = event;
            const threshold = 30;

            document.body.classList.toggle('header-active', clientY <= threshold);
            document.body.classList.toggle('footer-active', window.innerHeight - clientY <= threshold);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.classList.remove('header-active', 'footer-active');
        };
    }, [addToast]);
    
    const handleGenerate = async (prompt: string) => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-animation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (data.fallback) {
                addToast('AI generation failed. Using a random predefined animation.');
                
                let fallbackSettings: AnimationSettings | undefined;
                let attempts = 0;
                const maxAttempts = predefinedAnimations.length;

                // Try to find a predefined animation that isn't already on screen
                while (attempts < maxAttempts) {
                    const randomAnimation = predefinedAnimations[Math.floor(Math.random() * predefinedAnimations.length)];
                    const isDuplicate = animations.some(anim => areSettingsEqual(anim.settings, randomAnimation));
                    if (!isDuplicate) {
                        fallbackSettings = randomAnimation;
                        break;
                    }
                    attempts++;
                }

                // If all predefined animations are on screen, just pick a random one
                if (!fallbackSettings) {
                    fallbackSettings = predefinedAnimations[Math.floor(Math.random() * predefinedAnimations.length)];
                }

                const newAnimation: GeneratedAnimationType = {
                    id: crypto.randomUUID(),
                    prompt: `Fallback: ${prompt}`,
                    settings: fallbackSettings,
                };
                setAnimations(prev => [newAnimation, ...prev]);
                return;
            }

            const settings: AnimationSettings = data;
            
            // Check for duplicates from the AI
            const isDuplicate = animations.some(anim => areSettingsEqual(anim.settings, settings));
            if (isDuplicate) {
                addToast('That animation is too similar to one you already have. Try a different prompt!');
                return;
            }

            const newAnimation: GeneratedAnimationType = {
                id: crypto.randomUUID(),
                prompt,
                settings,
            };

            setAnimations(prev => {
                const updatedAnimations = [newAnimation, ...prev];
                localStorage.setItem('generatedAnimations', JSON.stringify(updatedAnimations));
                return updatedAnimations;
            });

        } catch (error) {
            console.error(error);
            addToast('Sorry, something went wrong. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAnimationClick = (animation: GeneratedAnimationType) => {
        setZoomedAnimation(prev => prev?.id === animation.id ? null : animation);
    };

    const animationCount = animations.length;
    let gridClass = '';
    if (zoomedAnimation) {
        gridClass = 'grid-1';
    } else {
        if (animationCount === 1) gridClass = 'grid-1';
        else if (animationCount === 2) gridClass = 'grid-2';
        else if (animationCount === 3) gridClass = 'grid-3';
        else if (animationCount >= 4) gridClass = 'grid-4';
    }

    const animationsToRender = zoomedAnimation ? [zoomedAnimation] : animations;

    return (
        <>
            <MatterBackground />
            <Header
                onGenerate={handleGenerate}
                onShowHint={() => addToast("Describe an animation in the header and click Generate!")}
                isGenerating={isGenerating}
            />
            <main>
                <div className={`animation-grid ${gridClass}`}>
                    {animationsToRender.map((anim) => (
                        <div
                            key={anim.id}
                            className={`animation-container ${zoomedAnimation?.id === anim.id ? 'zoomed' : ''}`}
                            onClick={() => handleAnimationClick(anim)}
                            style={{
                                cursor: !zoomedAnimation && animationCount > 1 ? 'pointer' : 'default',
                                display: zoomedAnimation && zoomedAnimation.id !== anim.id ? 'none' : 'flex'
                            }}
                        >
                            <GeneratedAnimation settings={anim.settings} />
                            {!zoomedAnimation && (
                                <div className="p-2 is-overlay has-background-dark-light is-size-7" style={{top: 'auto', opacity: 0.8}}>
                                    {anim.prompt}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
} 