'use client';

import { useState } from 'react';
import VoiceRecorderButton from './VoiceRecorderButton';

interface TriageFormProps {
  onSubmit: (data: { rawInput: string; inputType: 'voice' | 'text' }) => void;
}

export default function TriageForm({ onSubmit }: TriageFormProps) {
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('text');
  const [textInput, setTextInput] = useState('');
  
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim().length < 10) {
      alert('Please provide more details about your symptoms (at least 10 characters)');
      return;
    }
    onSubmit({ rawInput: textInput, inputType: 'text' });
  };
  
  const handleVoiceTranscript = (transcript: string) => {
    // Show the transcript in the text area for review
    setTextInput(transcript);
    // Auto-submit after showing transcript
    setTimeout(() => {
      onSubmit({ rawInput: transcript, inputType: 'voice' });
    }, 1000);
  };
  
  const handleVoiceError = (error: string) => {
    alert(`Voice recording error: ${error}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Describe Your Symptoms
      </h2>
      
      {/* Input Mode Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setInputMode('text')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            inputMode === 'text'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Type Symptoms
        </button>
        <button
          onClick={() => setInputMode('voice')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            inputMode === 'voice'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Voice Input
        </button>
      </div>
      
      {/* Text Input */}
      {inputMode === 'text' && (
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
              Tell us what you're experiencing
            </label>
            <textarea
              id="symptoms"
              rows={6}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Example: I've had a headache for 2 days, along with fever and body aches..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
          >
            Submit Symptoms
          </button>
        </form>
      )}
      
      {/* Voice Input */}
      {inputMode === 'voice' && (
        <div className="space-y-4">
          <div className="py-8">
            <VoiceRecorderButton 
              onTranscriptReady={handleVoiceTranscript}
              onError={handleVoiceError}
            />
          </div>
          
          {/* Show transcript preview */}
          {textInput && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-800 mb-2">
                ✅ Transcribed:
              </p>
              <p className="text-gray-700">{textInput}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> This is a triage tool to help prioritize care.
          It is not a diagnosis. In case of emergency, call 911 immediately.
        </p>
      </div>
    </div>
  );
}
