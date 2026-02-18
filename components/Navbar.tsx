
import React from 'react';

interface NavbarProps {
  onNav: (page: string) => void;
  currentPage: string;
  isAdmin: boolean;
  toggleAdmin: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, currentPage, isAdmin, toggleAdmin, isDarkMode, toggleDarkMode }) => {
  return (
    <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-md px-4 py-3 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-800'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNav('home')}>
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">ZeroCost <span className="text-indigo-600">Campus</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <button onClick={() => onNav('home')} className={`${currentPage === 'home' ? 'text-indigo-600' : ''} hover:text-indigo-600 transition-colors`}>Explore</button>
          <button onClick={() => onNav('starter-packs')} className={`${currentPage === 'starter-packs' ? 'text-indigo-600' : ''} hover:text-indigo-600 transition-colors`}>Starter Packs</button>
          <button onClick={() => onNav('ai-helper')} className={`${currentPage === 'ai-helper' ? 'text-indigo-600' : ''} hover:text-indigo-600 transition-colors`}>AI Helper</button>
          {isAdmin && (
             <button onClick={() => onNav('admin')} className={`${currentPage === 'admin' ? 'text-indigo-600' : ''} hover:text-indigo-600 transition-colors underline decoration-2 underline-offset-4`}>Admin</button>
          )}
        </div>

        <div className="flex items-center gap-3">
           <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button 
            onClick={toggleAdmin}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isAdmin ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {isAdmin ? 'Exit Admin' : 'Admin Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
