import React, { useContext, useState } from 'react';
import { PodcastContext } from '../context/PodcastContext';
import { generateAudio } from '../services/podcastService';
import { Edit3, PlayCircle, ArrowLeft } from 'lucide-react';

const ScriptReview: React.FC = () => {
  const { podcastData, setPodcastData, setCurrentStep, setIsGenerating, setError } = useContext(PodcastContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState(podcastData?.script || '');

  const handleGenerateAudio = async () => {
    if (!podcastData) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const audioUrl = await generateAudio(isEditing ? editedScript : podcastData.script);
      setPodcastData({
        ...podcastData,
        script: isEditing ? editedScript : podcastData.script,
        audioUrl
      });
      setCurrentStep('audio');
    } catch (err) {
      setError('Failed to generate audio. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!podcastData) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Review Script</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary flex items-center"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={editedScript}
          onChange={(e) => setEditedScript(e.target.value)}
          className="w-full h-64 p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      ) : (
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{podcastData.script}</p>
        </div>
      )}

      <div className="flex space-x-3 mt-6">
        <button 
          onClick={() => setCurrentStep('length')}
          className="btn-secondary flex-1 flex items-center justify-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <button 
          onClick={handleGenerateAudio}
          className="btn-primary flex-1 flex items-center justify-center"
        >
          <PlayCircle className="h-5 w-5 mr-2" />
          Generate Audio
        </button>
      </div>
    </div>
  );
};

export default ScriptReview;