'use client';

import React from 'react';
import { GeneratedAnimation as Animation } from '@/animations';
import GeneratedAnimation from './GeneratedAnimation';

interface MiniAnimationPreviewProps {
    animation: Animation;
    onClick: () => void;
}

const MiniAnimationPreview: React.FC<MiniAnimationPreviewProps> = ({ animation, onClick }) => {
    return (
        <div 
            className="mini-preview-container" 
            onClick={onClick}
            title={`Click to view: ${animation.prompt}`}
        >
            <div className="mini-preview-animation">
                <GeneratedAnimation settings={animation.settings} isZoomed={false} />
            </div>
            <div className="mini-preview-label">
                <span className="label-text">Last Viewed:</span>
                <span className="prompt-text">{animation.prompt}</span>
            </div>
        </div>
    );
};

export default MiniAnimationPreview; 