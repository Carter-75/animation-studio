'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const MatterBackground = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef(Matter.Engine.create());
    const runnerRef = useRef(Matter.Runner.create());

    useEffect(() => {
        const { engine, runner } = { engine: engineRef.current, runner: runnerRef.current };
        engine.gravity.y = 0.1;

        const render = Matter.Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent',
            },
        });

        const world = engine.world;
        const bodies = [];
        for (let i = 0; i < 50; i++) {
            bodies.push(
                Matter.Bodies.rectangle(
                    Math.random() * window.innerWidth,
                    Math.random() * -window.innerHeight,
                    20,
                    20,
                    {
                        restitution: 0.8,
                        friction: 0.1,
                        render: {
                            fillStyle: `hsl(${Math.random() * 360}, 100%, 70%)`,
                        },
                    }
                )
            );
        }
        Matter.Composite.add(world, bodies);

        const ground = Matter.Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 50,
            window.innerWidth,
            100,
            { isStatic: true, render: { visible: false } }
        );
        const leftWall = Matter.Bodies.rectangle(
            -50,
            window.innerHeight / 2,
            100,
            window.innerHeight,
            { isStatic: true, render: { visible: false } }
        );
        const rightWall = Matter.Bodies.rectangle(
            window.innerWidth + 50,
            window.innerHeight / 2,
            100,
            window.innerHeight,
            { isStatic: true, render: { visible: false } }
        );

        Matter.Composite.add(world, [ground, leftWall, rightWall]);
        Matter.Render.run(render);
        Matter.Runner.run(runner, engine);

        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
            Matter.Body.setPosition(leftWall, { x: -50, y: window.innerHeight / 2 });
            Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={sceneRef} className="background-container" />;
};

export default MatterBackground; 