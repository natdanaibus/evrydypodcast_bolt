import React from 'react';
import { Headphones, Sparkles, Download, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">About PodcastAI</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Revolutionizing content creation with AI-powered podcast generation
        </p>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <p>
          PodcastAI is a cutting-edge platform that leverages the power of artificial intelligence
          to transform the way podcasts are created and consumed. Our mission is to democratize
          podcast creation by making it accessible to everyone, regardless of technical expertise
          or equipment limitations.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Technology</h2>
        <p>
          We combine state-of-the-art language models to generate human-like podcast scripts
          with advanced text-to-speech technology from Gemini TTS to produce natural-sounding
          audio. The result is a seamless experience that allows you to create professional-quality
          podcasts in minutes, not hours.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold">AI Script Generation</h3>
            </div>
            <p className="text-gray-600">
              Our advanced language models create engaging, informative podcast scripts
              on any topic you choose, complete with natural transitions and conversational flow.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Headphones className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold">Gemini TTS Audio</h3>
            </div>
            <p className="text-gray-600">
              Gemini's text-to-speech technology converts your scripts into lifelike audio,
              with natural intonation, pacing, and expression that mimics human speech.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold">Customizable Length</h3>
            </div>
            <p className="text-gray-600">
              Choose the perfect podcast length for your needs, from quick 5-minute briefings
              to in-depth 30-minute explorations of complex topics.
            </p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Download className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold">Easy Download</h3>
            </div>
            <p className="text-gray-600">
              Listen to your podcast immediately in the browser or download the audio file
              to share or listen offline on any device.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Why PodcastAI?</h2>
        <p>
          Whether you're a content creator looking to expand your media presence, a business
          wanting to share insights with customers, or simply someone interested in exploring
          topics through audio, PodcastAI offers a revolutionary approach to podcast creation.
        </p>
        <p>
          Our platform eliminates the traditional barriers to podcast production—expensive equipment,
          technical knowledge, and time-consuming editing—making professional-quality audio content
          accessible to everyone.
        </p>
      </div>
    </div>
  );
};

export default About;