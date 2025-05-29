import React, { useState } from 'react';
import PodcastGenerator from '../components/PodcastGenerator';
import PodcastPlayer from '../components/PodcastPlayer';
import { PodcastContext } from '../context/PodcastContext';
import { PodcastData } from '../types';

const Home: React.FC = () => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <PodcastContext.Provider value={{ 
      podcastData, 
      setPodcastData, 
      isGenerating, 
      setIsGenerating, 
      error, 
      setError 
    }}>
      <div className="max-w-md mx-auto px-4 py-6 min-h-screen">
        {!podcastData && !isGenerating && <PodcastGenerator />}
        <PodcastPlayer />
      </div>
    </PodcastContext.Provider>
  );
};

export default Home;