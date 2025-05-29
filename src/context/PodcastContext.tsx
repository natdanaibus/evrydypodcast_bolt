import { createContext } from 'react';
import { PodcastContextType } from '../types';

export const PodcastContext = createContext<PodcastContextType>({
  podcastData: null,
  setPodcastData: () => {},
  isGenerating: false,
  setIsGenerating: () => {},
  error: null,
  setError: () => {}
});