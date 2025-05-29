import { PodcastLength, PodcastData, LLMProvider } from '../types';
import axios from 'axios';

const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_TTS_API_KEY = import.meta.env.VITE_GEMINI_TTS_API_KEY;

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
const GEMINI_TTS_API_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

export const generatePodcast = async (
  topic: string,
  length: PodcastLength,
  provider: LLMProvider
): Promise<PodcastData> => {
  if (!LLM_API_KEY || !GEMINI_TTS_API_KEY || !GEMINI_API_KEY) {
    throw new Error('API keys not configured. Please check your environment variables.');
  }

  try {
    // Step 1: Generate script using selected LLM
    let script: string;
    
    if (provider === 'openai') {
      const scriptResponse = await axios.post(
        OPENAI_API_ENDPOINT,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a professional podcast host creating engaging content."
            },
            {
              role: "user",
              content: generatePrompt(topic, length)
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${LLM_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      script = scriptResponse.data.choices[0].message.content;
    } else {
      const scriptResponse = await axios.post(
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
      script = scriptResponse.data.candidates[0].content.parts[0].text;
    }

    // Step 2: Convert script to audio using Google Cloud TTS API
    const audioResponse = await axios.post(
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

    // Convert base64 audio to blob URL
    const audioBuffer = Buffer.from(audioResponse.data.audioContent, 'base64');
    const audioBlob = new Blob([audioBuffer], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);

    // Generate podcast metadata
    const id = Math.random().toString(36).substring(2, 15);
    const lengthInMinutes = length === 'short' ? 5 : (length === 'medium' ? 10 : 20);
    const lengthFormatted = `${lengthInMinutes} minutes`;

    return {
      id,
      title: `Podcast: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
      topic,
      script,
      audioUrl,
      lengthType: length,
      lengthFormatted,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating podcast:', error);
    throw new Error('Failed to generate podcast. Please check your API keys and try again.');
  }
};

// Helper function to generate LLM prompt
const generatePrompt = (topic: string, length: PodcastLength): string => {
  const lengthInMinutes = length === 'short' ? 5 : (length === 'medium' ? 10 : 20);
  
  return `Generate a podcast script about ${topic}. 
The podcast should be approximately ${lengthInMinutes} minutes long when spoken.
Use a conversational tone and include:
- An engaging introduction
- Clear structure and transitions
- Relevant examples and explanations
- A concise conclusion
Make it sound natural and engaging, as if a real podcast host is speaking.`;
};

// Helper function to determine max tokens based on length
const getMaxTokens = (length: PodcastLength): number => {
  switch (length) {
    case 'short':
      return 500;
    case 'medium':
      return 1000;
    case 'long':
      return 2000;
    default:
      return 1000;
  }
};