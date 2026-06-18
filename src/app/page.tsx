import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-extrabold tracking-tighter sm:text-7xl mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          FORGEFIT
        </h1>
        <p className="max-w-[600px] text-gray-400 md:text-xl mb-8">
          The ultimate fitness tracking platform for those who settle for nothing but progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border border-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </main>
      <footer className="p-6 border-t border-gray-900 text-center text-sm text-gray-500">
        &copy; 2026 ForgeFit. Built for champions.
      </footer>
    </div>
  );
}
