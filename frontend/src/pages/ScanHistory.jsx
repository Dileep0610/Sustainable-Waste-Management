import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Calendar, Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ScanHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://127.0.0.1:5000/api/get-history?userId=${currentUser.uid}`);
      if (response.data.success) {
        setHistory(response.data.data.history || []);
      } else {
        setError(response.data.message || 'Failed to fetch history');
      }
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(history.map(item => item.category))].filter(Boolean);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.item?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Scan History</h1>
          <p className="text-gray-600 dark:text-zinc-400 font-sans mt-1">Review your past waste identifications and disposal actions.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by item name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-zinc-500 w-5 h-5" />
        </div>
        <div className="relative w-full md:w-64">
          <select
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none font-mono"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-zinc-500 w-5 h-5" />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm min-h-[300px]">
          <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-zinc-400 font-mono">Loading history...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm min-h-[300px]">
          <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
          <p className="text-red-400 font-medium font-sans">{error}</p>
          <button onClick={fetchHistory} className="mt-4 text-primary-500 hover:text-primary-400 hover:underline font-mono uppercase tracking-wider text-sm">Try Again</button>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm min-h-[300px]">
          <History className="w-12 h-12 text-gray-400 dark:text-zinc-600 mb-4" />
          <p className="text-gray-600 dark:text-zinc-400 font-sans text-lg">No scan history found.</p>
          {searchTerm || categoryFilter !== 'All' ? (
            <button onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }} className="mt-2 text-primary-500 hover:text-primary-400 hover:underline font-mono uppercase tracking-wider text-sm">
              Clear filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className="card overflow-hidden p-0 border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-500 text-sm font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold">Item</th>
                  <th className="py-4 px-6 font-bold">Category</th>
                  <th className="py-4 px-6 font-bold">Tags</th>
                  <th className="py-4 px-6 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800/50">
                {filteredHistory.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="py-4 px-6 font-heading text-lg tracking-wide text-gray-900 dark:text-zinc-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-xl shrink-0">
                        {scan.category_icon || <History className="w-5 h-5 text-gray-500 dark:text-zinc-500" />}
                      </div>
                      <span className="capitalize truncate max-w-[200px]" title={scan.item}>{scan.item}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-md text-xs font-bold font-mono tracking-tight uppercase bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700 break-words">
                        {scan.category || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {scan.is_recyclable && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/40 dark:border-green-500/30 dark:text-green-400 uppercase">Recyclable</span>}
                        {scan.is_hazardous && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/40 dark:border-red-500/30 dark:text-red-400 uppercase">Hazardous</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-zinc-400 font-sans text-sm">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Calendar className="w-4 h-4 text-gray-500 dark:text-zinc-500" /> {scan.formatted_date || 'Unknown Date'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col divide-y divide-gray-200 dark:divide-zinc-800/50">
            {filteredHistory.map((scan) => (
              <div key={scan.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-xl shrink-0">
                      {scan.category_icon || <History className="w-5 h-5 text-gray-500 dark:text-zinc-500" />}
                    </div>
                    <span className="font-heading text-lg tracking-wide text-gray-900 dark:text-zinc-100 capitalize truncate" title={scan.item}>{scan.item}</span>
                  </div>
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold font-mono tracking-tight uppercase bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700 shrink-0">
                    {scan.category || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <div className="flex flex-wrap gap-2">
                    {scan.is_recyclable && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/40 dark:border-green-500/30 dark:text-green-400 uppercase">Recyclable</span>}
                    {scan.is_hazardous && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/40 dark:border-red-500/30 dark:text-red-400 uppercase">Hazardous</span>}
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-400 font-sans text-xs">
                    <Calendar className="w-3 h-3" /> {scan.formatted_date || 'Unknown Date'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex justify-between items-center text-sm font-mono text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
            <span>Showing {filteredHistory.length} entries</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanHistory;
