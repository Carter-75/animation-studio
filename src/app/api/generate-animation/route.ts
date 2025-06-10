import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AnimationSettings } from '@/animations';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are an expert creative assistant that generates parameters for a web animation.
The user will provide a prompt, and you must return a JSON object with the specified animation settings.
Do not include any commentary, markdown, or any other text outside of the pure JSON object.

The JSON object must conform to the following TypeScript interface:
\`\`\`
interface AnimationSettings {
    shape: 'circle' | 'square' | 'triangle' | 'star';
    count: number; // An integer between 10 and 300
    colorPalette: string[]; // An array of 2 to 5 hex color codes
    motion: 'swirl' | 'explode' | 'fall' | 'grid-stagger' | 'float';
    duration: number; // An integer between 1000 and 10000
    easing: 'linear' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad';
    size: number; // An integer between 5 and 50
    backgroundColor: string; // A single hex color code
}
\`\`\`

Rules for interpreting the user's prompt:
- If the prompt mentions stars, space, or galaxy, use the 'star' shape.
- If it mentions geometric shapes, blocks, or technology, use 'square' or 'triangle'.
- For fluid, organic, or bubbly prompts, use 'circle'.
- 'swirl': Use for prompts mentioning vortex, galaxy, whirlpool.
- 'explode': Use for prompts mentioning fireworks, burst, shatter.
- 'fall': Use for rain, snow, confetti.
- 'grid-stagger': Use for technical, matrix, or orderly prompts.
- 'float': A gentle, rising and falling motion. Use for bubbles, embers, or calm scenes.
- Choose a 'colorPalette' and 'backgroundColor' that artistically match the theme of the prompt.
- Choose 'count', 'duration', and 'size' values that are appropriate for the described scene.
- Be creative but always adhere strictly to the format and allowed values.
`;

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ],
            response_format: { type: 'json_object' },
        });

        const settings = JSON.parse(response.choices[0].message.content || '{}') as AnimationSettings;
        
        // TODO: Add validation to ensure the returned settings match the schema.
        
        return NextResponse.json(settings);

    } catch (error) {
        console.error('Error generating animation settings:', error);
        // Send a specific error response that the frontend can identify
        return NextResponse.json({ error: true, fallback: true }, { status: 500 });
    }
} 