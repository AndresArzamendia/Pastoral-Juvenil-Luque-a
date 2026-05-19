import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'El prompt es requerido' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Falta configurar GEMINI_API_KEY.' }, { status: 500 });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);

    return NextResponse.json({ text: result.response.text() });
  } catch (error: unknown) {
    console.error('Error generating AI content:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error al generar contenido con IA.' }, { status: 500 });
  }
}
