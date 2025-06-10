'use client';

import React, { useState } from 'react';

interface HeaderProps {
    onGenerate: (prompt: string) => void;
    onShowHint: () => void;
    isGenerating: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGenerate, onShowHint, isGenerating }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isGenerating) {
            onGenerate(prompt);
        }
    };

    return (
        <header className="header">
            <div className="container is-flex is-justify-content-space-between is-align-items-center">
                <h1 className="title is-4 has-text-white mb-0 is-hidden-mobile">Animation Studio</h1>
                
                <form onSubmit={handleSubmit} style={{ flexGrow: 1, margin: '0 1rem' }}>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                className="input"
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., a swirling galaxy of stars"
                                disabled={isGenerating}
                            />
                        </div>
                        <div className="control">
                            <button className={`button is-info ${isGenerating ? 'is-loading' : ''}`} type="submit" disabled={isGenerating}>
                                Generate
                            </button>
                        </div>
                    </div>
                </form>

                <button className="button is-light is-outlined" onClick={onShowHint}>
                    ?
                </button>
            </div>
        </header>
    );
};

export default Header; 