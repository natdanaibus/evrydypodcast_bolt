import React, { useState } from 'react';
import PodcastGenerator from '../components/PodcastGenerator';
import ScriptReview from '../components/ScriptReview';
import PodcastPlayer from '../components/PodcastPlayer';
import { PodcastContext } from '../context/PodcastContext';
import { PodcastData } from '../types';

const Home: React.FC = () => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'topic' | 'length' | 'review' | 'audio'>('topic');

  return (
    <PodcastContext.Provider value={{ 
      podcastData, 
      setPodcastData, 
      isGenerating, 
      setIsGenerating, 
      error, 
      setError,
      currentStep,
      setCurrentStep
    }}>
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen">
        {currentStep === 'audio' ? (
          <PodcastPlayer />
        ) : currentStep === 'review' ? (
          <ScriptReview />
        ) : (
          <PodcastGenerator />
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl">
            {error}
          </div>
        )}
      </div>
    </PodcastContext.Provider>
  );
};

export default Home;