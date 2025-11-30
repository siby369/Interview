import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ace Your Next Interview
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 mt-4 leading-relaxed">
            Prepare for success with our comprehensive interview platform. Practice with real questions, get instant feedback, and build confidence for your next opportunity.
          </p>
          <Link
            href="/interview"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Start Interview
          </Link>
        </div>
      </div>
    </div>
  );
}

