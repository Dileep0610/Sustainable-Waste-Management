import React from 'react';
import { Heart, ShieldCheck, Leaf } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">About WasteGuide AI</h1>
        <p className="text-xl font-sans text-gray-700 dark:text-zinc-300">Empowering individuals and communities to make sustainable choices through technology.</p>
      </div>

      <div className="card p-8 md:p-12 text-center mt-8 transition-colors">
        <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600 dark:text-primary-400 transition-colors">
          <Leaf className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Our Mission</h2>
        <p className="text-gray-700 dark:text-zinc-300 font-sans leading-relaxed text-lg">
          We believe that proper waste management is the cornerstone of a sustainable future. 
          By combining advanced AI technology with accessible information, we're making it easier 
          than ever for everyone to recycle correctly, reduce waste, and protect our environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-500 dark:text-red-400" />
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Community Driven</h3>
          </div>
          <p className="text-gray-700 dark:text-zinc-300 font-sans leading-relaxed">
            Built for the community, by the community. We're constantly updating our database of 
            collection centers and waste types to ensure you have the most accurate information.
          </p>
        </div>

        <div className="card transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Accurate AI</h3>
          </div>
          <p className="text-gray-700 dark:text-zinc-300 font-sans leading-relaxed">
            Our image recognition models are trained on thousands of items to provide you with 
            reliable and instant sorting instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
