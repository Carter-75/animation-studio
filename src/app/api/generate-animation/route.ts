import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AnimationSettings } from '@/animations';
import {
    particleShapeOptions, motionPathOptions, colorStrategyOptions, rotationOptions,
    scaleBehaviourOptions, opacityBehaviourOptions, backgroundStyleOptions,
    particleDistributionOptions, edgeCollisionOptions, colorPalettes
} from '@/animations/fallback-options';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Helper to build a string list of options for the prompt
const optionsToString = (options: { value: string; description: string }[]) => {
    return options.map(o => `- "${o.value}": ${o.description}`).join('\n');
};

const motionEasingOptions = ['linear', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeOutCubic', 'easeInOutCubic'];

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
        }

        const systemPrompt = `
You are an expert animation designer. Your task is to translate a user's text prompt into a structured JSON object representing animation settings.
Carefully analyze the user's prompt and choose the best combination of settings to bring their vision to life.
The user's prompt is: "${prompt}"

You MUST select a value for every single property. Do NOT add any extra properties.
You MUST ONLY output a single, valid JSON object and nothing else. Do not wrap it in markdown or any other text.

Here are the available settings and their options:

1.  **particleShape**: The shape of the individual particles.
    ${optionsToString(particleShapeOptions)}

2.  **particleSize**: The base size of particles in pixels.
    - Choose an integer between 5 and 50. Smaller for delicate things, larger for bold things.

3.  **particleCount**: The total number of particles on screen.
    - Choose an integer between 10 and 500. More for "swarms" or "rain", fewer for "specimens" or "features".

4.  **colorPalette**: A list of 2-5 hex colors that particles will use. Choose a palette from the list below that best matches the prompt's mood.
    - Available palettes: ${colorPalettes.map(p => `[${p.join(', ')}]`).join(', ')}

5.  **colorStrategy**: How the palette colors are applied to particles.
    ${optionsToString(colorStrategyOptions)}

6.  **backgroundStyle**: The style of the animation's background.
    ${optionsToString(backgroundStyleOptions)}

7.  **backgroundColor**: The primary hex color for the background. If using a gradient, this is the first color.

8.  **motionPath**: The primary trajectory of the particles.
    ${optionsToString(motionPathOptions)}

9.  **motionDuration**: The time in milliseconds for one animation cycle.
    - Choose an integer between 2000 (fast) and 20000 (very slow).

10. **motionEasing**: The acceleration curve of the animation.
    - Choose one from: ${motionEasingOptions.join(', ')}

11. **particleDistribution**: How particles are initially placed or generated.
    ${optionsToString(particleDistributionOptions)}

12. **edgeCollision**: What happens when particles hit the screen edge.
    ${optionsToString(edgeCollisionOptions)}

13. **rotationStyle**: How particles rotate.
    ${optionsToString(rotationOptions)}

14. **scaleBehaviour**: How particle size changes over time.
    ${optionsToString(scaleBehaviourOptions)}

15. **opacityBehaviour**: How particle opacity changes over time.
    ${optionsToString(opacityBehaviourOptions)}
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: `Generate the animation settings JSON for the prompt: "${prompt}"`,
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.8,
        });

        const content = response.choices[0].message.content;
        console.log("OpenAI Raw Response:", content);

        if (!content) {
            throw new Error("Empty response from OpenAI");
        }

        const settings: AnimationSettings = JSON.parse(content);

        // Basic validation
        if (!settings.particleShape || !settings.particleCount) {
             throw new Error("Invalid animation settings received from OpenAI");
        }

        return NextResponse.json({ settings });

    } catch (error) {
        console.error('Error generating animation:', error);
        let errorMessage = 'Failed to generate animation.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
} 