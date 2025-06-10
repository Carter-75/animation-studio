'use client';

import React from 'react';
import { AnimationComponent } from '@/animations';

interface MiniAnimationPreviewProps {
    animation: AnimationComponent;
    onClick: () => void;
}

const MiniAnimationPreview: React.FC<MiniAnimationPreviewProps> = ({ animation, onClick }) => {
    const Animation = animation.component;

    return (
        <div
            onClick={onClick}
            title={`Click to view '${animation.name}'`}
            style={{
                cursor: 'pointer',
                border: '1px solid #555',
                borderRadius: '4px',
                width: '100px',
                height: '60px',
                overflow: 'hidden',
                position: 'relative',
                transform: 'scale(1)',
                transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    transform: 'scale(0.25)', // Scale down the animation to fit
                    pointerEvents: 'none',
                }}
            >
                <Animation />
            </div>
        </div>
    );
};

export default MiniAnimationPreview; 