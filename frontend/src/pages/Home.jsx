import React from 'react';
import { ArrowRight, Leaf, Recycle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-zinc-800 relative overflow-hidden shadow-lg dark:shadow-none transition-colors duration-300">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-zinc-100 mb-4 tracking-wide uppercase">
            Smarter Waste Management for a <span className="text-primary-600 dark:text-primary-500">Greener Future</span>
          </h1>
          <p className="text-lg font-sans text-gray-600 dark:text-zinc-400 mb-8">
            Identify waste, find nearby collection centers, and track your environmental impact using our AI-powered platform.
          </p>
          <div className="flex flex-wrap gap-4 font-mono font-bold uppercase tracking-wider text-sm">
            <Link to="/scanner" className="btn-primary flex items-center gap-2">
              <Recycle className="w-5 h-5" />
              Scan Waste Now
            </Link>
            <Link to="/centers" className="btn-secondary flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Find Centers
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 hidden lg:block opacity-10 dark:opacity-5">
          <Leaf className="w-64 h-64 text-primary-600 dark:text-primary-500" />
        </div>
      </section>

      {/* Features Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:-translate-y-1 flex flex-col h-full">
          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-500/20 rounded-xl flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 transition-colors">
            <Recycle className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Smart Scanning</h3>
          <p className="font-sans text-gray-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
            Instantly identify waste types and get proper disposal instructions using advanced AI image recognition.
          </p>
          <Link to="/scanner" className="mt-auto font-mono text-primary-600 dark:text-primary-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
            Try it out <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="card hover:-translate-y-1 flex flex-col h-full">
          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-500/20 rounded-xl flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Collection Centers</h3>
          <p className="font-sans text-gray-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
            Locate nearby recycling facilities and waste collection centers with our interactive map.
          </p>
          <Link to="/centers" className="mt-auto font-mono text-primary-600 dark:text-primary-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
            View Map <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="card hover:-translate-y-1 flex flex-col h-full">
          <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-500/20 rounded-xl flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 transition-colors">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Impact Analytics</h3>
          <p className="font-sans text-gray-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
            Track your sustainability efforts, view statistics, and monitor your positive environmental impact.
          </p>
          <Link to="/dashboard" className="mt-auto font-mono text-primary-600 dark:text-primary-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
            View Stats <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
