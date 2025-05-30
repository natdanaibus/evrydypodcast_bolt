import React, { useState, useContext } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { generateScript } from '../services/podcastService';
import { PodcastLength } from '../types';
import { Sparkles, Clock, ChevronRight, Edit3 } from 'lucide-react';

const PodcastGenerator: React.FC = () => {
  const { setIsGenerating, setPodcastData, setError, currentStep, setCurrentStep } = useContext(PodcastContext);
  const [topic, setTopic] = useState('');
  const [podcastLength, setPodcastLength] = useState<PodcastLength>('2min');
  const [script, setScript] = useState('');
  
  const lengthOptions = [
    { value: '30sec', label: '30 seconds', description: 'Quick brief' },
    { value: '1min', label: '1 minute', description: 'Short summary' },
    { value: '2min', label: '2 minutes', description: 'Brief overview' },
    { value: '3min', label: '3 minutes', description: 'Detailed coverage' },
    { value: '5min', label: '5 minutes', description: 'In-depth exploration' }
  ];

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic for your podcast');
      return;
    }
    setCurrentStep('length');
  };

  const handleLengthSubmit = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const scriptData = await generateScript(topic, podcastLength);
      setPodcastData({
        id: Math.random().toString(36).substring(2, 15),
        title: `Podcast: ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        topic,
        script: scriptData,
        audioUrl: null,
        lengthType: podcastLength,
        lengthFormatted: lengthOptions.find(opt => opt.value === podcastLength)?.label || '',
        createdAt: new Date().toISOString()
      });
      setCurrentStep('review');
    } catch (err) {
      setError('Failed to generate script. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (currentStep === 'topic') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">What's on your mind?</h2>
          <p className="text-gray-600">Enter a topic you'd like to create a podcast about</p>
        </div>
        
        <form onSubmit={handleTopicSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              className="input text-lg text-center"
              placeholder="e.g., The future of AI"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <button 
            type="submit"
            className="btn-primary w-full flex items-center justify-center"
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </form>
      </div>
    );
  }

  if (currentStep === 'length') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">How long should it be?</h2>
          <p className="text-gray-600">Choose your preferred podcast length</p>
        </div>
        
        <div className="space-y-3">
          {lengthOptions.map((option) => (
            <button
              key={option.value}
              className={`w-full p-4 rounded-2xl border transition-all duration-200 flex items-center
                ${podcastLength === option.value 
                  ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-200' 
                  : 'bg-white border-gray-100 hover:bg-gray-50'}`}
              onClick={() => setPodcastLength(option.value as PodcastLength)}
            >
              <Clock className={`h-5 w-5 ${podcastLength === option.value ? 'text-primary-500' : 'text-gray-400'}`} />
              <div className="ml-3 text-left">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button 
            onClick={() => setCurrentStep('topic')}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button 
            onClick={handleLengthSubmit}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Generate
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default PodcastGenerator;