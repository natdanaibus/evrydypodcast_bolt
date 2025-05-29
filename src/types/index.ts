export type PodcastLength = 'short' | 'medium' | 'long';

export interface PodcastData {
  id: string;
  title: string;
  topic: string;
  script: string;
  audioUrl: string;
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
}