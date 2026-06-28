import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import ResultCard from '../components/scanner/ResultCard';
import { useAuth } from '../contexts/AuthContext';

const LOADING_MESSAGES = [
  'Identifying waste...',
  'Checking recyclability...',
  'Finding disposal instructions...',
  'Generating eco tips...'
];

const WasteScanner = () => {
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!item.trim()) {
      setError('Please enter a waste item to analyze.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingMessageIndex(0);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/analyze-waste', {
        item: item.trim()
      });
      
      if (response.data.success && response.data.result) {
        const analyzeResult = response.data.result;
        setResult(analyzeResult);
        
        // Save history in the background
        try {
          await axios.post('http://127.0.0.1:5000/api/save-history', {
            userId: currentUser.uid,
            item: analyzeResult.item,
            category: analyzeResult.category,
            category_icon: analyzeResult.category_icon,
            is_recyclable: analyzeResult.is_recyclable,
            is_hazardous: analyzeResult.is_hazardous,
            is_reusable: analyzeResult.is_reusable,
            full_response: analyzeResult
          });
        } catch (saveErr) {
          console.error('Error saving history:', saveErr);
          // We don't fail the UI if history save fails
        }
      } else {
        setError(response.data.message || 'Received an invalid response from the server.');
      }
    } catch (err) {
      console.error('Error analyzing waste:', err);
      setError(err.response?.data?.message || 'Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setResult(null);
    setItem('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Waste Scanner</h1>
        <p className="text-gray-600 dark:text-zinc-400 font-sans mt-2">Enter the name of a waste item to get detailed disposal instructions and eco-tips.</p>
      </div>

      {!result && !loading && (
        <form onSubmit={handleAnalyze} className="card p-4 md:p-8 mt-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="waste-item" className="text-sm font-sans font-medium text-gray-700 dark:text-zinc-300 uppercase tracking-wider">What do you need to dispose of?</label>
            <div className="relative">
              <input
                id="waste-item"
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg transition-all font-mono"
                placeholder="e.g. Plastic Bottle, Banana Peel, AA Batteries..."
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                  if (error) setError(null);
                }}
                disabled={loading}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-zinc-500 w-6 h-6" />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-950/30 border border-red-900/50 p-3 rounded-lg text-sm mt-2 font-mono">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn-primary w-full py-4 text-lg mt-4 flex items-center justify-center gap-2 uppercase tracking-wide font-bold"
              disabled={loading || !item.trim()}
            >
              Analyze Item
            </button>
          </div>
        </form>
      )}

      {loading && (
        <div className="card mt-8 p-6 md:p-12 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm min-h-[300px]">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-6" />
          <h3 className="text-2xl font-heading font-medium text-gray-900 dark:text-zinc-100 mb-2 uppercase tracking-wide">Analyzing...</h3>
          <p className="text-gray-600 dark:text-zinc-400 font-mono text-sm animate-pulse h-8">
            {LOADING_MESSAGES[loadingMessageIndex]}
          </p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6">
          <ResultCard result={result} />
          <div className="flex justify-center pt-4">
            <button 
              onClick={handleRetry}
              className="btn-secondary flex items-center gap-2 px-6 py-3"
            >
              <RefreshCw className="w-4 h-4" />
              Scan Another Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteScanner;
