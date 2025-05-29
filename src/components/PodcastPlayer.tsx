import React, { useContext, useRef, useState, useEffect } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { Play, Pause, SkipBack, SkipForward, Download, Loader2, Volume2 } from 'lucide-react';

const PodcastPlayer: React.FC = () => {
  const { podcastData, isGenerating } = useContext(PodcastContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [waveformBars] = useState(() => Array.from({ length: 40 }, () => 
    Math.random() * 0.8 + 0.2
  ));

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (podcastData) {
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [podcastData]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isGenerating) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-12">
        <div className="card p-8 w-full text-center">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4 mx-auto" />
          <h3 className="text-xl font-medium mb-2">Creating Your Podcast</h3>
          <p className="text-gray-600">
            We're crafting your audio content...
          </p>
          
          <div className="waveform mt-8">
            {waveformBars.map((height, i) => (
              <div 
                key={i} 
                className="waveform-bar animate-wave" 
                style={{ 
                  height: `${height * 100}%`,
                  animationDelay: `${i * 0.05}s`
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!podcastData) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-12">
        <div className="card p-8 w-full text-center">
          <Volume2 className="w-12 h-12 text-primary-300 mb-4 mx-auto" />
          <h3 className="text-xl font-medium mb-2">Ready to Play</h3>
          <p className="text-gray-600">
            Generate your first podcast to start listening
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Volume2 className="h-6 w-6 text-primary-500" />
        <h2 className="text-xl font-semibold">Now Playing</h2>
      </div>
      
      <div className="card p-6 space-y-6">
        {podcastData.audioUrl && (
          <audio
            ref={audioRef}
            src={podcastData.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
        )}
        
        <div>
          <h3 className="text-lg font-medium truncate">{podcastData.title}</h3>
          <p className="text-gray-500 text-sm">{podcastData.lengthFormatted}</p>
        </div>
        
        <div className="waveform">
          {waveformBars.map((height, i) => (
            <div 
              key={i} 
              className="waveform-bar" 
              style={{ 
                height: `${height * 100}%`,
                opacity: isPlaying ? 1 : 0.5,
                animation: isPlaying ? 'wave 1.5s ease-in-out infinite' : 'none',
                animationDelay: `${i * 0.05}s`
              }} 
            />
          ))}
        </div>
        
        <div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={handleSkipBack}
              className="p-2 rounded-xl hover:bg-gray-50"
              aria-label="Skip back 10 seconds"
            >
              <SkipBack className="h-6 w-6 text-gray-700" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-4 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 shadow-soft"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>
            
            <button 
              onClick={handleSkipForward}
              className="p-2 rounded-xl hover:bg-gray-50"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center space-x-2 text-sm"
            aria-label="Download podcast"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;