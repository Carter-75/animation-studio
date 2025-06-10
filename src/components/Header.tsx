'use client';

import { useState } from 'react';
import { GeneratedAnimation as Animation } from '@/animations';
import MiniAnimationPreview from './MiniAnimationPreview';

export interface HeaderProps {
    onGenerate: (prompt: string, useFallback?: boolean) => void;
    isGenerating: boolean;
    isManageMode: boolean;
    onToggleManageMode: () => void;
    onDeleteSelected: () => void;
    onDeleteAll: () => void;
    selectedCount: number;
    lastZoomedAnimation: Animation | null;
    onPreviewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
    onGenerate,
    isGenerating,
    isManageMode,
    onToggleManageMode,
    onDeleteSelected,
    onDeleteAll,
    selectedCount,
    lastZoomedAnimation,
    onPreviewClick,
}) => {
    const [prompt, setPrompt] = useState('');

    const handleGenerateClick = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
            setPrompt('');
        }
    };
    
    const handleRandomClick = () => {
        onGenerate('A touch of randomness', true);
    };

    return (
        <header className="header">
            <div className="header-left">
                {lastZoomedAnimation && !isManageMode && (
                    <MiniAnimationPreview animation={lastZoomedAnimation} onClick={onPreviewClick} />
                )}
            </div>
            
            <div className="header-center">
                {!isManageMode ? (
                    <>
                        <input
                            type="text"
                            className="input is-rounded"
                            placeholder="Describe an animation..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerateClick()}
                            disabled={isGenerating}
                        />
                        <button
                            className={`button is-primary is-rounded ${isGenerating ? 'is-loading' : ''}`}
                            onClick={handleGenerateClick}
                            disabled={isGenerating || !prompt.trim()}
                        >
                            Generate
                        </button>
                        <button
                            className={`button is-light is-rounded ${isGenerating ? 'is-loading' : ''}`}
                            onClick={handleRandomClick}
                            disabled={isGenerating}
                            title="Generate a random animation"
                        >
                           🎲
                        </button>
                    </>
                ) : (
                    <div className="manage-controls">
                         <p>{selectedCount} selected</p>
                        <button className="button is-danger" onClick={onDeleteSelected} disabled={selectedCount === 0}>
                            Delete Selected
                        </button>
                        <button className="button is-danger is-light" onClick={onDeleteAll}>
                            Delete All
                        </button>
                    </div>
                )}
            </div>

            <div className="header-right">
                <button
                    className={`button is-rounded ${isManageMode ? 'is-info' : 'is-light'}`}
                    onClick={onToggleManageMode}
                >
                    {isManageMode ? 'Done' : 'Manage'}
                </button>
            </div>
        </header>
    );
};

export default Header; 