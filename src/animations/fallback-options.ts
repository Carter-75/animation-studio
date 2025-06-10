import { AnimationSettings } from ".";

type Option<T> = { value: T; description: string };

// Helper to get a random item from an options array
export const getRandomOption = <T,>(options: Option<T>[]): T => options[Math.floor(Math.random() * options.length)].value;
export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- Expanded Animation Settings & Options ---

export const particleShapeOptions: Option<AnimationSettings['particleShape']>[] = [
    { value: 'circle', description: "For bubbles, orbs, soft things" },
    { value: 'square', description: "For blocks, pixels, technical themes" },
    { value: 'triangle', description: "For geometric, sharp, or directional themes" },
    { value: 'star', description: "For sparks, magic, space" },
    { value: 'line', description: "For rain, speed, futuristic themes" },
    { value: 'hexagon', description: "For honeycomb, sci-fi, complex patterns" },
];

export const motionPathOptions: Option<AnimationSettings['motionPath']>[] = [
    { value: 'linear', description: "Straight line movement" },
    { value: 'sine', description: "Wavy, oscillating movement" },
    { value: 'circular', description: "Movement in a circular path" },
    { value: 'vortex', description: "Spiraling towards the center" },
    { value: 'gravity', description: "Falling downwards with acceleration" },
    { value: 'anti-gravity', description: "Floating upwards with acceleration" },
];

export const colorStrategyOptions: Option<AnimationSettings['colorStrategy']>[] = [
    { value: 'solid', description: "All particles are the first color in the palette" },
    { value: 'random-from-palette', description: "Each particle gets a random color from the palette" },
    { value: 'palette-sequence', description: "Particles cycle through the palette colors in order" },
    { value: 'random-lerp', description: "Random color interpolated between the first two in the palette" },
];

export const rotationOptions: Option<AnimationSettings['rotationStyle']>[] = [
    { value: 'none', description: "No rotation" },
    { value: 'constant-cw', description: "Slowly rotates clockwise" },
    { value: 'constant-ccw', description: "Slowly rotates counter-clockwise" },
    { value: 'random-direction', description: "Each particle rotates in a random direction" },
    { value: 'spin-on-bounce', description: "Flips or spins when hitting an edge" },
];

export const scaleBehaviourOptions: Option<AnimationSettings['scaleBehaviour']>[] = [
    { value: 'constant', description: "Particles maintain their size" },
    { value: 'pulse', description: "Particles gently grow and shrink" },
    { value: 'shrink-over-life', description: "Particles get smaller as they fade" },
    { value: 'grow-over-life', description: "Particles get larger as they fade" },
    { value: 'random-flicker', description: "Flickers between different small sizes" },
];

export const opacityBehaviourOptions: Option<AnimationSettings['opacityBehaviour']>[] = [
    { value: 'constant', description: "Particles maintain their opacity" },
    { value: 'fadeIn', description: "Particles start transparent and fade in" },
    { value: 'fadeOut', description: "Particles fade out over their lifetime" },
    { value: 'pulse', description: "Opacity gently fades in and out" },
];

export const backgroundStyleOptions: Option<AnimationSettings['backgroundStyle']>[] = [
    { value: 'solid', description: "A single solid background color" },
    { value: 'radial-gradient', description: "A gradient radiating from the center" },
    { value: 'linear-gradient', description: "A gradient moving from top to bottom" },
    { value: 'subtle-noise', description: "A solid color with a subtle, animated noise texture" },
];

export const particleDistributionOptions: Option<AnimationSettings['particleDistribution']>[] = [
    { value: 'uniform', description: "Spread randomly and evenly across the screen" },
    { value: 'center-burst', description: "Emanate from the center of the screen" },
    { value: 'top-edge', description: "Emanate from the top edge" },
    { value: 'bottom-edge', description: "Emanate from the bottom edge" },
    { value: 'follow-mouse', description: "Emanate from the user's mouse position" },
];

export const edgeCollisionOptions: Option<AnimationSettings['edgeCollision']>[] = [
    { value: 'bounce', description: "Particles bounce off the edges of the screen" },
    { value: 'wrap', description: "Particles wrap around to the opposite edge" },
    { value: 'destroy', description: "Particles are destroyed and respawn when they hit an edge" },
    { value: 'absorb', description: "Particles stick to the edges" },
];

// A curated list of 25 color palettes
export const colorPalettes: string[][] = [
    ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'], // Vibrant
    ['#000000', '#14213d', '#fca311', '#e5e5e5', '#ffffff'], // Industrial
    ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788'], // Forest
    ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'], // Ocean
    ['#ffafcc', '#ffc8dd', '#cdb4db', '#a2d2ff', '#bde0fe'], // Pastel
    ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d'], // Sunset
    ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'], // Earthy
    ['#fec5bb', '#fcd5ce', '#fae1dd', '#f8edeb', '#e8e8e4'], // Skin Tones
    ['#ffc6ff', '#b8c0ff', '#9bf6ff', '#a0c4ff', '#caffbf'], // Neon
    ['#22223b', '#4a4e69', '#9a8c98', '#c9ada7', '#f2e9e4'], // Muted
    ['#335c67', '#fff3b0', '#e09f3e', '#9e2a2b', '#540b0e'], // Retro
    ['#1a535c', '#4ecdc4', '#f7fff7', '#ff6b6b', '#ffe66d'], // Playful
    ['#6d6875', '#b5838d', '#e5989b', '#ffb4a2', '#ffcdb2'], // Rosy
    ['#003049', '#d62828', '#f77f00', '#fcbf49', '#eae2b7'], // Bold
    ['#780000', '#c1121f', '#fdf0d5', '#003049', '#669bbc'], // Nautical
];

// A curated list of 10 background colors
export const fallbackBackgrounds: string[] = [
    '#000033', '#1E1E1E', '#4682B4', '#2F4F4F', '#4B0082',
    '#000000', '#191970', '#0A0A0A', '#333333', '#000010'
];

// A curated list of 10 color palettes
export const fallbackPalettes: string[][] = [
    ['#FFFFFF', '#FFD700', '#ADD8E6'], // Cosmic
    ['#FF6347', '#4682B4', '#3CB371'], // Geometric
    ['#00BFFF', '#87CEEB', '#AFEEEE'], // Bubbly
    ['#D2691E', '#CD5C5C', '#F0E68C'], // Autumn
    ['#FFB6C1', '#FFC0CB', '#FFF0F5'], // Gentle
    ['#00FF00', '#32CD32', '#008000'], // Matrix
    ['#FF4500', '#FFD700', '#FF69B4'], // Firework
    ['#00FFFF', '#FF00FF', '#FFFF00'], // Techno
    ['#FF1493', '#00BFFF', '#32CD32'], // Confetti
    ['#FFFFFF', '#E6E6FA', '#D8BFD8']  // Space
]; 