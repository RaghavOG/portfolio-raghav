import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { query, type } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    let systemPrompt = '';
    let maxTokens = 150; // Keep tokens minimal

    if (type === 'ask') {
      systemPrompt = 'You are a helpful AI assistant for a developer portfolio. Give concise, practical answers in 2-3 sentences. Be friendly and professional.';
    } else if (type === 'code') {
      systemPrompt = 'You are a code generation assistant. Generate clean, commented code snippets. Keep responses under 100 tokens. Only include the code and brief explanation.';
      maxTokens = 200;
    } else if (type === 'review') {
      systemPrompt = 'You are a code reviewer. Provide 3-4 brief bullet points: what\'s good, what to improve, and a rating out of 10. Be constructive and concise.';
      maxTokens = 120;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Most token-efficient model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' }, 
      { status: 500 }
    );
  }
}
