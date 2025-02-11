import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
}

export async function POST({ request }: { request: Request }) {
  const { message }: ChatRequest = await request.json();

  // Use OpenAI to generate a response
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
  });

  const reply = completion.choices[0].message.content ?? '';

  return new Response(JSON.stringify({ reply } satisfies ChatResponse), {
    headers: { 'Content-Type': 'application/json' },
  });
}
