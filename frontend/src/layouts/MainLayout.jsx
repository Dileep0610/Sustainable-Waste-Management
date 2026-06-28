import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import MobileNav from '../components/common/MobileNav';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-300 overflow-hidden font-sans transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <MobileNav />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 md:pb-8 w-full max-w-full">
          <div className="max-w-7xl mx-auto h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
