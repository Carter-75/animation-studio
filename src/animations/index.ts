import React from 'react';
import FireAnimation from './FireAnimation';

export interface AnimationComponent {
    name: string;
    component: React.ComponentType;
}

const animations: AnimationComponent[] = [
    {
        name: 'Fire',
        component: FireAnimation,
    }
];

export default animations; 