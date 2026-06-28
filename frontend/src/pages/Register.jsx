import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, AlertCircle, Loader2 } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Failed to create an account. ' + (err.message || ''));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-500 w-full px-4">
      <div className="w-full max-w-md card p-8 border border-gray-200 dark:border-zinc-800 shadow-xl dark:shadow-none bg-white dark:bg-zinc-900 transition-colors">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Leaf className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-zinc-100 uppercase tracking-wide">Join WasteGuide</h2>
          <p className="text-gray-600 dark:text-zinc-400 font-sans mt-2 text-center">Create an account to start your sustainability journey.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-3 rounded-lg text-sm mb-6 font-mono transition-colors">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-sans font-medium text-gray-700 dark:text-zinc-300 uppercase tracking-wider block">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-mono"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-sans font-medium text-gray-700 dark:text-zinc-300 uppercase tracking-wider block">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-mono"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-sans font-medium text-gray-700 dark:text-zinc-300 uppercase tracking-wider block">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors font-mono"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 flex justify-center items-center gap-2 uppercase font-bold tracking-wide transition-all min-h-[44px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 dark:border-zinc-800 pt-6 transition-colors">
          <p className="text-gray-600 dark:text-zinc-400 font-sans text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 hover:underline font-medium transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
