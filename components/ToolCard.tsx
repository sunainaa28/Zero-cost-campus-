
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onCompareToggle: (tool: Tool) => void;
  isComparing: boolean;
  onViewDetails: (tool: Tool) => void;
  isDarkMode: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onCompareToggle, isComparing, onViewDetails, isDarkMode }) => {
  return (
    <div className={`group rounded-2xl border transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col h-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className="relative h-40 overflow-hidden">
        <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
           {tool.offlineAvailable && (
             <span className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Offline Ready</span>
           )}
           {tool.popular && (
             <span className="bg-amber-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Popular</span>
           )}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1 block">{tool.category}</span>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tool.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm font-medium">
             <span className="text-amber-500">★</span>
             <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{tool.rating}</span>
          </div>
        </div>
        
        <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{tool.description}</p>
        
        {tool.paidAlternativeTo && (
           <div className={`text-xs py-2 px-3 rounded-lg border mb-4 ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
              Alternative to: <span className="font-bold">{tool.paidAlternativeTo}</span>
           </div>
        )}

        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap gap-2">
            {tool.platforms.slice(0, 3).map(p => (
              <span key={p} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">{p}</span>
            ))}
            {tool.platforms.length > 3 && <span className="text-[10px] text-slate-400">+{tool.platforms.length - 3}</span>}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <button 
              onClick={() => onViewDetails(tool)}
              className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${isDarkMode ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            >
              Details
            </button>
            <button 
              onClick={() => onCompareToggle(tool)}
              className={`text-sm font-semibold py-2 px-3 rounded-xl transition-all ${isComparing ? 'bg-indigo-600 text-white shadow-lg' : isDarkMode ? 'bg-indigo-900/40 text-indigo-300 hover:bg-indigo-800/40' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
            >
              {isComparing ? 'Comparing...' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
