import { GOOGLE_APPLICATION_CREDENTIALS } from '$env/static/private';
import { SpeechClient } from '@google-cloud/speech';
import { readFileSync } from 'fs';
import type { RequestHandler } from '@sveltejs/kit';

// Initialize Google Speech Client
const speechClient = new SpeechClient({
  credentials: JSON.parse(readFileSync(GOOGLE_APPLICATION_CREDENTIALS, 'utf-8')),
});

interface SpeechRequest {
  audio: string; // Base64 audio data
}

interface SpeechResponse {
  transcription: string;
}

export const POST: RequestHandler = async ({ request }) => {
  const { audio }: SpeechRequest = await request.json();

  try {
    // Transcribe the audio
    const [response] = await speechClient.recognize({
      audio: { content: audio },
      config: {
        encoding: 'WEBM_OPUS', // Updated for browser-recorded audio
        sampleRateHertz: 48000, // Updated for browser-recorded audio
        languageCode: 'en-US',
      },
    });

const transcription = response.results
  ? response.results.map((result) => result.alternatives && result.alternatives[0].transcript).join('\n')
  : '';

    return new Response(JSON.stringify({ transcription } satisfies SpeechResponse), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return new Response(JSON.stringify({ error: 'Failed to transcribe audio' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
