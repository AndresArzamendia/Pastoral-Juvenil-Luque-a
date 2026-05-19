import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Google Gen AI SDK
// It automatically picks up GEMINI_API_KEY from the environment
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'El prompt es requerido' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: unknown) {
    console.error('Error generating AI content:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error al generar contenido con IA.' }, { status: 500 });
  }
}
