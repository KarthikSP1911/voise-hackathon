'use client';

import { useState, useRef } from 'react';

interface VoiceRecorderButtonProps {
  onTranscriptReady: (transcript: string) => void;
  onError?: (error: string) => void;
}

export default function VoiceRecorderButton({ onTranscriptReady, onError }: VoiceRecorderButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const startRecording = async () => {
    try {
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : 'audio/mp4';
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error: any) {
      console.error('Failed to start recording:', error);
      const errorMsg = error.name === 'NotAllowedError' 
        ? 'Microphone access denied. Please allow microphone access in your browser settings.'
        : 'Failed to start recording. Please check your microphone.';
      setError(errorMsg);
      onError?.(errorMsg);
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const formData = new FormData();
      const audioFile = new File([audioBlob], 'recording.webm', { type: audioBlob.type });
      formData.append('audio', audioFile);
      
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Transcription failed');
      }
      
      onTranscriptReady(data.transcript);
      
    } catch (error: any) {
      console.error('Transcription error:', error);
      const errorMsg = error.message || 'Failed to transcribe audio';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
      setRecordingTime(0);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {/* Recording Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all shadow-2xl ${
          isRecording
            ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse scale-105'
            : isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-110'
        }`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-2"></div>
            <span className="text-sm">Processing...</span>
          </div>
        ) : isRecording ? (
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
            <span className="text-sm">Stop</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm">Tap to Record</span>
          </div>
        )}
        
        {/* Recording indicator ring */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
        )}
      </button>
      
      {/* Timer */}
      {isRecording && (
        <div className="bg-red-50 border-2 border-red-200 rounded-full px-6 py-3">
          <p className="text-3xl font-bold text-red-600 tabular-nums">
            {formatTime(recordingTime)}
          </p>
        </div>
      )}
      
      {/* Status Message */}
      <div className="text-center max-w-md">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          {isRecording
            ? '🎙️ Recording in progress...'
            : isProcessing
            ? '⏳ Transcribing your voice...'
            : '👆 Tap the microphone to start'}
        </p>
        <p className="text-sm text-gray-600">
          {isRecording
            ? 'Speak clearly and describe your symptoms. Tap stop when finished.'
            : isProcessing
            ? 'Please wait while we process your recording.'
            : 'We use AI to transcribe your voice accurately.'}
        </p>
      </div>
      
      {/* Instructions Card */}
      {!isRecording && !isProcessing && (
        <div className="card max-w-2xl w-full p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tips for Best Results</span>
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Speak clearly and at a moderate pace</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Describe when symptoms started and how severe they are</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Mention any other symptoms you're experiencing</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Find a quiet place to reduce background noise</span>
            </li>
          </ul>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="card max-w-2xl w-full p-6 border-red-200 bg-red-50">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Recording Error</h4>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
