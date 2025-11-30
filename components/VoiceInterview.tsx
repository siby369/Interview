"use client";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface VoiceInterviewProps {
  question?: string;
}

export default function VoiceInterview({ 
  question = "Tell me about yourself and your background." 
}: VoiceInterviewProps) {
  const {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    isSupported,
  } = useSpeechRecognition();

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Question Display */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Current Question
        </h2>
        <p className="text-xl text-gray-900 leading-relaxed">{question}</p>
      </div>

      {/* Microphone Button */}
      <div className="flex justify-center">
        <button
          onClick={toggleRecording}
          disabled={(!isSupported || (!!error && !isListening))}
          className={`
            relative w-24 h-24 rounded-full flex items-center justify-center
            transition-all duration-300 transform hover:scale-105 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-offset-2
            ${
              isListening
                ? "bg-red-500 hover:bg-red-600 focus:ring-red-500 animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            }
            ${(!isSupported || (error && !isListening)) ? "opacity-50 cursor-not-allowed" : ""}
          `}
          aria-label={isListening ? "Stop recording" : "Start recording"}
        >
          {/* Microphone Icon */}
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>

          {/* Recording indicator */}
          {isListening && (
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping"></span>
          )}
        </button>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">
          {isListening ? (
            <span className="text-red-600">Recording... Speak now</span>
          ) : (
            <span className="text-gray-500">Click the microphone to start</span>
          )}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Live Transcript Preview */}
      <div className="bg-gray-50 rounded-lg shadow-md p-6 min-h-[200px]">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Live Transcript
        </h3>
        <div className="bg-white rounded-md p-4 min-h-[150px] max-h-96 overflow-y-auto">
          {transcript ? (
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {transcript}
            </p>
          ) : (
            <p className="text-gray-400 italic">
              Your transcript will appear here as you speak...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

