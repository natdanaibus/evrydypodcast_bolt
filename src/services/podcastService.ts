import axios from 'axios';
import { PodcastLength } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_TTS_API_KEY = import.meta.env.VITE_GEMINI_TTS_API_KEY;

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
const GEMINI_TTS_API_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

export const generateScript = async (
  topic: string,
  length: PodcastLength
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const response = await axios.post(
      GEMINI_API_ENDPOINT,
      {
        contents: [{
          parts: [{
            text: generatePrompt(topic, length)
          }]
        }]
      },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating script:', error);
    throw new Error('Failed to generate script');
  }
};

export const generateAudio = async (script: string): Promise<string> => {
  if (!GEMINI_TTS_API_KEY) {
    throw new Error('Gemini TTS API key not configured');
  }

  try {
    const response = await axios.post(
      GEMINI_TTS_API_ENDPOINT,
      {
        input: { text: script },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-D',
          ssmlGender: 'MALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 1.0,
          pitch: 0
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_TTS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const audioBuffer = Buffer.from(response.data.audioContent, 'base64');
    const audioBlob = new Blob([audioBuffer], { type: 'audio/mp3' });
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error generating audio:', error);
    throw new Error('Failed to generate audio');
  }
};

const generatePrompt = (topic: string, length: PodcastLength): string => {
  const wordCount = {
    '30sec': 75,
    '1min': 150,
    '2min': 300,
    '3min': 450,
    '5min': 750
  }[length];
  
  return `Generate a podcast script about ${topic}. 
The script should be approximately ${wordCount} words (for ${length} of speech).
Use a conversational tone and include:
- An engaging introduction
- Clear structure
- Relevant examples
- A concise conclusion
Make it sound natural and engaging, as if a real podcast host is speaking.`;
};