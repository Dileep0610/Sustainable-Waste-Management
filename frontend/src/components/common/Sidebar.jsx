import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Camera, MapPin, History, BarChart2, Info, Leaf, Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Waste Scanner', path: '/scanner', icon: <Camera className="w-5 h-5" /> },
    { name: 'Collection Centers', path: '/centers', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Scan History', path: '/history', icon: <History className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden lg:flex flex-col h-screen sticky top-0 shadow-lg dark:shadow-none transition-colors duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-gray-200 dark:border-zinc-800">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white dark:text-zinc-100 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
          <Leaf className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-heading font-bold text-gray-900 dark:text-zinc-100 tracking-tight leading-tight">WasteGuide</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-1.5 py-0.5 rounded self-start border border-primary-200 dark:border-primary-500/30 mt-0.5">Demo Mode</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 font-medium border border-primary-200 dark:border-primary-500/30'
                  : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-200 border border-transparent'
              }`
            }
          >
            {item.icon}
            <span className="font-sans">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans text-gray-500 dark:text-zinc-400">Theme</span>
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        {currentUser ? (
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/50 p-4 rounded-xl text-center transition-colors">
            <p className="text-xs text-primary-700 dark:text-primary-400 font-medium mb-3 font-sans truncate" title={currentUser.email}>
              {currentUser.email}
            </p>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-3 py-2 rounded-lg w-full hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        ) : (
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/50 p-4 rounded-xl flex flex-col gap-2 transition-colors">
            <button onClick={() => navigate('/login')} className="text-xs font-mono font-bold uppercase tracking-wider bg-primary-600 text-white dark:text-zinc-100 px-3 py-2 rounded-lg w-full hover:bg-primary-500 transition-all shadow-md dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              Log In
            </button>
            <button onClick={() => navigate('/register')} className="text-xs font-mono font-bold uppercase tracking-wider bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-3 py-2 rounded-lg w-full hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm">
              Register
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
