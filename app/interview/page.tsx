import VoiceInterview from "@/components/VoiceInterview";

export default function InterviewPage() {
  const sampleQuestion =
    "Tell me about yourself. What are your strengths and how do they relate to this position?";

  return (
    <div className="py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Voice Interview Session
        </h1>
        <p className="text-gray-600">
          Click the microphone button to start recording your answer
        </p>
      </div>
      <VoiceInterview question={sampleQuestion} />
    </div>
  );
}

