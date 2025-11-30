import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
          {/* Logo/Name */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              App Name
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/interview"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Interview
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

