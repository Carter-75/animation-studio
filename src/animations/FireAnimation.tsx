'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const FireAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            x: number;
            y: number;
            radius: number;
            color: string;
            alpha: number;
            vy: number;
            vx: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 6 + 1;
                const red = Math.floor(Math.random() * 55 + 200);
                const green = Math.floor(Math.random() * 50 + 50);
                this.color = `rgba(${red}, ${green}, 0, 1)`;
                this.alpha = 1;
                this.vy = Math.random() * -3 - 1;
                this.vx = (Math.random() - 0.5) * 2;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= 0.02;
                if (this.radius > 0.1) {
                    this.radius -= 0.05;
                }
            }
        }

        const particles: Particle[] = [];

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Generate particles from the bottom center
            const centerX = canvas.width / 2;
            const startY = canvas.height;
            for(let i = 0; i < 5; i++) {
                particles.push(new Particle(centerX + (Math.random() - 0.5) * 50, startY));
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.alpha <= 0 || p.radius <= 0.1) {
                    particles.splice(i, 1);
                }
            }
            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default FireAnimation; 