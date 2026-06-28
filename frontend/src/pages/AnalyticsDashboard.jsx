import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Award, AlertTriangle, Activity, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://127.0.0.1:5000/api/dashboard-data?userId=${currentUser.uid}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? '#a1a1aa' : '#6b7280';
  const gridColor = isDark ? '#27272a' : '#e5e7eb';
  const tooltipBg = isDark ? 'rgba(24, 24, 27, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipText = isDark ? '#e4e4e7' : '#1f2937';

  ChartJS.defaults.color = textColor;
  ChartJS.defaults.font.family = '"Space Mono", monospace';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <p className="text-zinc-500 text-lg font-mono">Loading your analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-400 font-medium text-lg font-sans">{error}</p>
        <button onClick={fetchDashboardData} className="mt-4 btn-secondary font-mono uppercase tracking-wider text-sm">Try Again</button>
      </div>
    );
  }

  if (!data || data.totalScans === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm min-h-[400px] text-center">
        <Activity className="w-16 h-16 text-zinc-700 mb-4" />
        <h2 className="text-2xl font-heading font-bold text-zinc-100 mb-2 uppercase tracking-wide">No Scans Yet</h2>
        <p className="text-zinc-500 mb-6 font-sans">Scan some waste items to start building your analytics dashboard.</p>
      </div>
    );
  }

  const { totalScans, recyclableCount, hazardousCount, recycleRate, categoryCounts, weeklyTrend } = data;
  const nonRecyclableCount = totalScans - recyclableCount - hazardousCount;

  // Doughnut Chart Data
  const doughnutData = {
    labels: ['Recyclable', 'Non-Recyclable', 'Hazardous'],
    datasets: [
      {
        data: [recyclableCount, nonRecyclableCount, hazardousCount],
        backgroundColor: ['#10b981', isDark ? '#3f3f46' : '#9ca3af', '#ef4444'],
        hoverBackgroundColor: ['#059669', isDark ? '#27272a' : '#6b7280', '#dc2626'],
        borderWidth: 1,
        borderColor: isDark ? '#18181b' : '#ffffff',
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: weeklyTrend.map(t => {
      const date = new Date(t.date);
      // Adding UTC to make sure it shows the right day locally if the backend returns it at midnight UTC
      return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    }),
    datasets: [
      {
        label: 'Daily Scans',
        data: weeklyTrend.map(t => t.count),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Items by Category',
        data: Object.values(categoryCounts),
        backgroundColor: '#10b981',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor: gridColor,
        borderWidth: 1,
      }
    },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: textColor } },
      y: { grid: { color: gridColor }, ticks: { color: textColor } },
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-zinc-400 font-sans mt-1">Track your sustainability metrics and environmental impact.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-900/20 border border-primary-500/20 rounded-xl flex items-center justify-center text-primary-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono uppercase tracking-wider mb-1">Total Scans</p>
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100">{totalScans}</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-900/20 border border-green-500/20 rounded-xl flex items-center justify-center text-green-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono uppercase tracking-wider mb-1">Recyclable</p>
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100">{recyclableCount}</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-900/20 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono uppercase tracking-wider mb-1">Hazardous</p>
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100">{hazardousCount}</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-900/20 border border-primary-500/20 rounded-xl flex items-center justify-center text-primary-500">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono uppercase tracking-wider mb-1">Recycle Rate</p>
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100">{recycleRate}%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="card flex flex-col items-center col-span-1">
          <h3 className="font-heading text-gray-900 dark:text-zinc-100 text-lg font-bold mb-4 w-full text-left uppercase tracking-wide">Waste Composition</h3>
          <div className="w-full max-w-[250px] aspect-square flex items-center justify-center">
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: textColor, font: { family: '"Space Mono", monospace' } } } } }} />
          </div>
        </div>
        <div className="card flex flex-col col-span-1 lg:col-span-2">
          <h3 className="font-heading text-gray-900 dark:text-zinc-100 text-lg font-bold mb-4 uppercase tracking-wide">Weekly Scanning Activity</h3>
          <div className="flex-1 w-full min-h-[250px]">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      <div className="card mt-6">
        <h3 className="font-heading text-gray-900 dark:text-zinc-100 text-lg font-bold mb-4 uppercase tracking-wide">Category Distribution</h3>
        <div className="w-full h-[300px]">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
