import { AnimationSettings } from ".";

export const predefinedAnimations: AnimationSettings[] = [
    // 1. Cosmic Swirl
    {
        shape: 'star',
        count: 150,
        colorPalette: ['#FFFFFF', '#FFD700', '#ADD8E6'],
        motion: 'swirl',
        duration: 8000,
        easing: 'linear',
        size: 10,
        backgroundColor: '#000033'
    },
    // 2. Geometric Dance
    {
        shape: 'triangle',
        count: 50,
        colorPalette: ['#FF6347', '#4682B4', '#3CB371'],
        motion: 'grid-stagger',
        duration: 5000,
        easing: 'easeInOutQuad',
        size: 30,
        backgroundColor: '#1E1E1E'
    },
    // 3. Bubble Pop
    {
        shape: 'circle',
        count: 40,
        colorPalette: ['#00BFFF', '#87CEEB', '#AFEEEE'],
        motion: 'explode',
        duration: 3000,
        easing: 'easeOutQuad',
        size: 25,
        backgroundColor: '#4682B4'
    },
    // 4. Autumn Fall
    {
        shape: 'square',
        count: 100,
        colorPalette: ['#D2691E', '#CD5C5C', '#F0E68C'],
        motion: 'fall',
        duration: 10000,
        easing: 'linear',
        size: 15,
        backgroundColor: '#2F4F4F'
    },
    // 5. Gentle Float
    {
        shape: 'circle',
        count: 60,
        colorPalette: ['#FFB6C1', '#FFC0CB', '#FFF0F5'],
        motion: 'float',
        duration: 9000,
        easing: 'easeInOutSine',
        size: 20,
        backgroundColor: '#4B0082'
    },
    // 6. Matrix Rain
    {
        shape: 'square',
        count: 300,
        colorPalette: ['#00FF00', '#32CD32', '#008000'],
        motion: 'fall',
        duration: 4000,
        easing: 'linear',
        size: 8,
        backgroundColor: '#000000'
    },
    // 7. Firework Burst
    {
        shape: 'star',
        count: 200,
        colorPalette: ['#FF4500', '#FFD700', '#FF69B4'],
        motion: 'explode',
        duration: 2500,
        easing: 'easeOutSine',
        size: 12,
        backgroundColor: '#191970'
    },
    // 8. Techno Grid
    {
        shape: 'square',
        count: 80,
        colorPalette: ['#00FFFF', '#FF00FF', '#FFFF00'],
        motion: 'grid-stagger',
        duration: 6000,
        easing: 'easeInQuad',
        size: 22,
        backgroundColor: '#0A0A0A'
    },
    // 9. Confetti Party
    {
        shape: 'triangle',
        count: 250,
        colorPalette: ['#FF1493', '#00BFFF', '#32CD32', '#FFD700'],
        motion: 'fall',
        duration: 7000,
        easing: 'easeOutQuad',
        size: 8,
        backgroundColor: '#FFFFFF'
    },
    // 10. Deep Space
    {
        shape: 'circle',
        count: 200,
        colorPalette: ['#FFFFFF', '#E6E6FA', '#D8BFD8'],
        motion: 'float',
        duration: 10000,
        easing: 'linear',
        size: 5,
        backgroundColor: '#000010'
    }
]; 