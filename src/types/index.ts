export type PodcastLength = '30sec' | '1min' | '2min' | '3min' | '5min';

export interface PodcastData {
  id: string;
  title: string;
  topic: string;
  script: string;
  audioUrl: string | null;
  lengthType: PodcastLength;
  lengthFormatted: string;
  createdAt: string;
}

export interface PodcastContextType {
  podcastData: PodcastData | null;
  setPodcastData: (data: PodcastData | null) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  currentStep: 'topic' | 'length' | 'review' | 'audio';
  setCurrentStep: (step: 'topic' | 'length' | 'review' | 'audio') => void;
}