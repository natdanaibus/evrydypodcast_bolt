import React, { useState, useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { generatePodcast } from '../services/podcastService';
import { PodcastLength, LLMProvider } from '../types';
import { Sparkles, Clock, Volume2, Brain } from 'lucide-react';

const PodcastGenerator: React.FC = () => {
  const { setIsGenerating, setPodcastData, setError } = useContext(PodcastContext);
  const [topic, setTopic] = useState('');
  const [podcastLength, setPodcastLength] = useState<PodcastLength>('medium');
  const [llmProvider, setLlmProvider] = useState<LLMProvider>('openai');
  
  const lengthOptions = [
    { value: 'short', label: '5 minutes', icon: Clock, description: 'Quick overview' },
    { value: 'medium', label: '10 minutes', icon: Clock, description: 'Detailed coverage' },
    { value: 'long', label: '20 minutes', icon: Clock, description: 'In-depth exploration' }
  ];

  const llmOptions = [
    { value: 'openai', label: 'OpenAI', description: 'GPT-3.5 Turbo' },
    { value: 'gemini', label: 'Google Gemini', description: 'Gemini Pro' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic for your podcast');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const data = await generatePodcast(topic, podcastLength, llmProvider);
      setPodcastData(data);
    } catch (err) {
      setError('Failed to generate podcast. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Volume2 className="h-6 w-6 text-primary-500" />
        <h2 className="text-xl font-semibold">Create Your Podcast</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="topic" className="input-label">
            What would you like to hear about?
          </label>
          <input
            type="text"
            id="topic"
            className="input"
            placeholder="e.g., The history of space exploration"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div>
          <label className="input-label">Choose AI Model:</label>
          <div className="grid grid-cols-2 gap-3">
            {llmOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  p-4 rounded-2xl border transition-all duration-200
                  ${llmProvider === option.value 
                    ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-200' 
                    : 'bg-white border-gray-100 hover:bg-gray-50'}
                `}
                onClick={() => setLlmProvider(option.value as LLMProvider)}
              >
                <Brain className={`h-5 w-5 mb-2 mx-auto ${llmProvider === option.value ? 'text-primary-500' : 'text-gray-400'}`} />
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="input-label">Choose length:</label>
          <div className="grid grid-cols-3 gap-3">
            {lengthOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  p-4 rounded-2xl border transition-all duration-200
                  ${podcastLength === option.value 
                    ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-200' 
                    : 'bg-white border-gray-100 hover:bg-gray-50'}
                `}
                onClick={() => setPodcastLength(option.value as PodcastLength)}
              >
                <option.icon className={`h-5 w-5 mb-2 ${podcastLength === option.value ? 'text-primary-500' : 'text-gray-400'}`} />
                <div className="font-medium text-sm">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <button 
          type="submit"
          className="btn-primary w-full flex items-center justify-center"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Generate Podcast
        </button>
      </form>
    </div>
  );
};

export default PodcastGenerator;