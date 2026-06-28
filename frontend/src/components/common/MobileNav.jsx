import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Camera, MapPin, Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const mainItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Scan', path: '/scanner', icon: <Camera className="w-5 h-5" /> },
    { name: 'Map', path: '/centers', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden">
      {/* Top Navbar */}
      <div className="bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 p-4 flex justify-between items-center sticky top-0 z-[60] transition-colors duration-300">
        <div className="flex flex-col">
          <span className="text-xl font-heading font-bold text-gray-900 dark:text-zinc-100 tracking-wide leading-tight">WasteGuide</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-1.5 py-0.5 rounded self-start border border-primary-200 dark:border-primary-500/30 mt-0.5">Demo Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 focus:outline-none hover:text-primary-500 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-500 dark:text-zinc-400 focus:outline-none hover:text-primary-500 transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Drawer Panel */}
      <div className={`fixed top-0 left-0 h-screen w-72 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col pt-[80px] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="flex flex-col gap-2 font-sans h-full">
            <NavLink to="/history" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors font-medium">Scan History</NavLink>
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors font-medium">Impact Dashboard</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors font-medium">About</NavLink>
            
            <div className="border-t border-gray-200 dark:border-zinc-800 my-4"></div>
            
            <div className="mt-auto">
              {currentUser ? (
                <div className="flex flex-col gap-3">
                  <div className="px-4 py-2 text-xs text-gray-500 dark:text-zinc-500 font-mono truncate bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
                    Logged in as <br /><span className="text-gray-900 dark:text-zinc-300 font-bold">{currentUser.email}</span>
                  </div>
                  <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg transition-colors w-full font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { setIsOpen(false); navigate('/login'); }} className="text-sm font-mono font-bold uppercase tracking-wider bg-primary-600 text-white dark:text-zinc-100 px-4 py-3.5 rounded-lg w-full hover:bg-primary-500 transition-all shadow-md">
                    Log In
                  </button>
                  <button onClick={() => { setIsOpen(false); navigate('/register'); }} className="text-sm font-mono font-bold uppercase tracking-wider bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700 px-4 py-3.5 rounded-lg w-full hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all">
                    Register
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 flex justify-around p-2 pb-safe z-20 transition-colors">
        {mainItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${
                isActive ? 'text-primary-600 dark:text-primary-500' : 'text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300'
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] font-sans font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
