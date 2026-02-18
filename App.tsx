
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Tool, Category, StarterPack, Platform } from './types';
import { INITIAL_TOOLS, INITIAL_STARTER_PACKS } from './constants';
import Navbar from './components/Navbar';
import ToolCard from './components/ToolCard';
import { getAIRecommendation } from './services/geminiService';

// --- Sub-components for pages ---

const Home: React.FC<{ 
  tools: Tool[], 
  categories: Category[], 
  onCompareToggle: (t: Tool) => void, 
  compareList: Tool[],
  isDarkMode: boolean 
}> = ({ tools, categories, onCompareToggle, compareList, isDarkMode }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [onlyOffline, setOnlyOffline] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'popular'>('popular');

  const filteredTools = useMemo(() => {
    return tools
      .filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                            t.description.toLowerCase().includes(search.toLowerCase()) ||
                            (t.paidAlternativeTo?.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        const matchesPlatform = selectedPlatform === 'All' || t.platforms.includes(selectedPlatform);
        const matchesOffline = !onlyOffline || t.offlineAvailable;
        return matchesSearch && matchesCategory && matchesPlatform && matchesOffline;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [tools, search, selectedCategory, selectedPlatform, onlyOffline, sortBy]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 space-y-4">
        <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          High-Quality Tools, <span className="text-indigo-600">Zero Cost.</span>
        </h1>
        <p className={`max-w-2xl mx-auto text-lg md:text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Bridging the digital divide with student-centric free alternatives to premium software.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group mt-8">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </div>
           <input 
            type="text" 
            placeholder="Search by name, category, or paid alternative (e.g., Photoshop)" 
            className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-indigo-100 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-600'}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </section>

      {/* Filters Bar */}
      <section className={`sticky top-[72px] z-40 py-4 px-2 border-y backdrop-blur-md transition-colors ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-center md:justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {['All', ...categories].map(c => (
              <button 
                key={c}
                onClick={() => setSelectedCategory(c as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === c ? 'bg-indigo-600 text-white shadow-md' : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'}`}
              >
                {c}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              className={`bg-transparent text-sm font-medium p-1 outline-none border-b-2 cursor-pointer ${isDarkMode ? 'text-white border-slate-700 focus:border-indigo-500' : 'text-slate-700 border-slate-200 focus:border-indigo-600'}`}
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as any)}
            >
              <option value="All">All Platforms</option>
              {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={onlyOffline} onChange={() => setOnlyOffline(!onlyOffline)} className="accent-indigo-600 w-4 h-4" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Offline Ready</span>
            </label>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Showing {filteredTools.length} results</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setSortBy('popular')} className={`text-sm font-bold ${sortBy === 'popular' ? 'text-indigo-600' : 'text-slate-400'}`}>Popular</button>
            <span className="text-slate-300">|</span>
            <button onClick={() => setSortBy('rating')} className={`text-sm font-bold ${sortBy === 'rating' ? 'text-indigo-600' : 'text-slate-400'}`}>Highest Rated</button>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onCompareToggle={onCompareToggle} 
                isComparing={compareList.some(t => t.id === tool.id)}
                onViewDetails={(t) => window.open(t.officialLink, '_blank')}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
             <div className="text-6xl">🔍</div>
             <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No tools found matching your criteria</h3>
             <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Try adjusting your search terms or filters.</p>
             <button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedPlatform('All'); setOnlyOffline(false); }} className="text-indigo-600 font-bold hover:underline">Clear all filters</button>
          </div>
        )}
      </section>
    </div>
  );
};

const StarterPacksPage: React.FC<{ starterPacks: StarterPack[], tools: Tool[], isDarkMode: boolean }> = ({ starterPacks, tools, isDarkMode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
      <div className="text-center space-y-2">
        <h1 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Curated Starter Packs</h1>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Hand-picked bundles of free tools specifically for your academic or professional role.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {starterPacks.map(pack => {
          const packTools = pack.toolIds.map(id => tools.find(t => t.id === id)).filter(Boolean) as Tool[];
          return (
            <div key={pack.id} className={`p-8 rounded-3xl border transition-all hover:shadow-xl group ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
               <div className="text-5xl mb-6">{pack.icon}</div>
               <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">{pack.role}</span>
               <h3 className={`text-2xl font-bold mt-4 mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pack.title}</h3>
               <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{pack.description}</p>
               
               <div className="space-y-4 border-t pt-6 border-slate-100 dark:border-slate-700">
                 {packTools.map(t => (
                   <div key={t.id} className="flex items-center justify-between group/tool">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl overflow-hidden">
                           <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{t.name}</p>
                            <p className="text-[10px] text-slate-400">{t.category}</p>
                         </div>
                      </div>
                      <a href={t.officialLink} target="_blank" className="opacity-0 group-hover/tool:opacity-100 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                   </div>
                 ))}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AIHelper: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    const recommendation = await getAIRecommendation(prompt);
    setResult(recommendation);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12 animate-fadeIn">
       <div className="text-center space-y-4">
          <div className="inline-block p-4 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 text-3xl">🤖</div>
          <h1 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Smart Alternative Finder</h1>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Can't find what you need? Tell me which paid tool you use, or what task you're trying to achieve.</p>
       </div>

       <div className={`p-8 rounded-3xl shadow-xl space-y-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'}`}>
          <textarea 
            placeholder="e.g., 'I need a free alternative to Adobe After Effects for motion graphics' or 'Suggest a study planner for medical students'"
            className={`w-full h-32 p-4 rounded-2xl border-2 outline-none transition-all resize-none ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-600'}`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            disabled={loading}
            onClick={handleSearch}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${loading ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing with Gemini AI...
              </>
            ) : 'Find Free Alternatives'}
          </button>
       </div>

       {result && (
         <div className="space-y-8 animate-slideUp">
            {result.advice && (
               <div className={`p-6 rounded-2xl border-l-4 border-indigo-600 ${isDarkMode ? 'bg-indigo-900/10 text-slate-300' : 'bg-indigo-50 text-slate-700'}`}>
                  <p className="font-medium">AI Insights: {result.advice}</p>
               </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.recommendedTools?.map((tool: any, idx: number) => (
                <div key={idx} className={`p-6 rounded-3xl border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tool.name}</h3>
                  <p className="text-xs font-semibold text-indigo-500 mb-3">Alternative to: {tool.paidAlternative}</p>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{tool.description}</p>
                  <div className={`p-4 rounded-xl mb-4 text-sm italic ${isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
                    " {tool.whyRecommend} "
                  </div>
                  <a href={tool.officialLink} target="_blank" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
                    Official Website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
         </div>
       )}
    </div>
  );
};

const AdminDashboard: React.FC<{ 
  tools: Tool[], 
  onSave: (t: Tool) => void, 
  onDelete: (id: string) => void,
  isDarkMode: boolean
}> = ({ tools, onSave, onDelete, isDarkMode }) => {
  const [editingTool, setEditingTool] = useState<Partial<Tool> | null>(null);

  const emptyTool: Partial<Tool> = {
    name: '',
    category: Category.DESIGN,
    description: '',
    features: [],
    pricingModel: 'Free',
    officialLink: '',
    offlineAvailable: false,
    platforms: [Platform.WEB],
    pros: [],
    cons: [],
    rating: 4.0,
    popular: false,
    imageUrl: `https://picsum.photos/seed/${Date.now()}/400/250`
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Tool Management</h1>
          <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Admin access to manage platform database.</p>
        </div>
        <button 
          onClick={() => setEditingTool(emptyTool)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Tool
        </button>
      </div>

      <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <table className="w-full text-left">
          <thead className={isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-50 text-slate-600'}>
            <tr>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Tool</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Alt To</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Rating</th>
              <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-100'}`}>
            {tools.map(tool => (
              <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={tool.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tool.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{tool.category}</span>
                </td>
                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{tool.paidAlternativeTo || '-'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{tool.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingTool(tool)} className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => onDelete(tool.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingTool && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
           <div className={`w-full max-w-2xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto custom-scrollbar ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{editingTool.id ? 'Edit Tool' : 'New Tool Entry'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <div>
                       <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Name</label>
                       <input value={editingTool.name} onChange={e => setEditingTool({...editingTool, name: e.target.value})} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                    </div>
                    <div>
                       <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Category</label>
                       <select value={editingTool.category} onChange={e => setEditingTool({...editingTool, category: e.target.value as Category})} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}>
                          {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Paid Alternative To</label>
                       <input value={editingTool.paidAlternativeTo || ''} onChange={e => setEditingTool({...editingTool, paidAlternativeTo: e.target.value})} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Official URL</label>
                       <input value={editingTool.officialLink} onChange={e => setEditingTool({...editingTool, officialLink: e.target.value})} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                    </div>
                    <div>
                       <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Description</label>
                       <textarea value={editingTool.description} onChange={e => setEditingTool({...editingTool, description: e.target.value})} className={`w-full p-3 rounded-xl border h-24 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                    </div>
                 </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                 <button onClick={() => setEditingTool(null)} className={`px-6 py-3 rounded-xl font-bold ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}>Cancel</button>
                 <button onClick={() => { 
                   if(editingTool.name && editingTool.officialLink) {
                     onSave({
                       ...editingTool as Tool,
                       id: editingTool.id || Math.random().toString(36).substr(2, 9),
                       rating: editingTool.rating || 4.0,
                       features: editingTool.features || [],
                       platforms: editingTool.platforms || [Platform.WEB],
                       pros: editingTool.pros || [],
                       cons: editingTool.cons || []
                     });
                     setEditingTool(null);
                   }
                 }} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none">Save Tool</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [starterPacks, setStarterPacks] = useState<StarterPack[]>([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [compareList, setCompareList] = useState<Tool[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load local storage
    const savedTools = localStorage.getItem('zerocost_tools');
    const savedPacks = localStorage.getItem('zerocost_packs');
    
    if (savedTools) setTools(JSON.parse(savedTools));
    else setTools(INITIAL_TOOLS);

    if (savedPacks) setStarterPacks(JSON.parse(savedPacks));
    else setStarterPacks(INITIAL_STARTER_PACKS);
  }, []);

  useEffect(() => {
    if (tools.length > 0) localStorage.setItem('zerocost_tools', JSON.stringify(tools));
    if (starterPacks.length > 0) localStorage.setItem('zerocost_packs', JSON.stringify(starterPacks));
  }, [tools, starterPacks]);

  const toggleCompare = (tool: Tool) => {
    setCompareList(prev => {
      if (prev.some(t => t.id === tool.id)) return prev.filter(t => t.id !== tool.id);
      if (prev.length >= 3) return prev;
      return [...prev, tool];
    });
  };

  const handleSaveTool = (tool: Tool) => {
    setTools(prev => {
      const idx = prev.findIndex(t => t.id === tool.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = tool;
        return next;
      }
      return [tool, ...prev];
    });
  };

  const handleDeleteTool = (id: string) => {
    if (confirm("Are you sure you want to remove this tool?")) {
      setTools(prev => prev.filter(t => t.id !== id));
    }
  };

  const categories = Object.values(Category);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar 
        onNav={setCurrentPage} 
        currentPage={currentPage} 
        isAdmin={isAdmin} 
        toggleAdmin={() => setIsAdmin(!isAdmin)} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main>
        {currentPage === 'home' && (
          <Home 
            tools={tools} 
            categories={categories} 
            onCompareToggle={toggleCompare} 
            compareList={compareList} 
            isDarkMode={isDarkMode}
          />
        )}
        {currentPage === 'starter-packs' && (
          <StarterPacksPage starterPacks={starterPacks} tools={tools} isDarkMode={isDarkMode} />
        )}
        {currentPage === 'ai-helper' && (
          <AIHelper isDarkMode={isDarkMode} />
        )}
        {currentPage === 'admin' && (
          <AdminDashboard tools={tools} onSave={handleSaveTool} onDelete={handleDeleteTool} isDarkMode={isDarkMode} />
        )}
      </main>

      {/* Comparison Drawer */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center items-end pointer-events-none">
          <div className={`w-full max-w-4xl p-6 rounded-t-3xl shadow-2xl pointer-events-auto border-t border-x transition-all translate-y-0 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <span className="bg-indigo-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">{compareList.length}</span>
                Comparison Tray
              </h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCompareList([])}
                  className={`text-sm font-bold px-4 py-2 rounded-xl transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  Clear
                </button>
                {compareList.length > 1 && (
                  <button className="bg-indigo-600 text-white text-sm font-bold px-6 py-2 rounded-xl hover:bg-indigo-700">
                    Compare Now
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {compareList.map(t => (
                <div key={t.id} className={`p-4 rounded-2xl border flex items-center justify-between group relative overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                   <div className="flex items-center gap-3">
                      <img src={t.imageUrl} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-bold text-sm truncate max-w-[100px]">{t.name}</span>
                   </div>
                   <button onClick={() => toggleCompare(t)} className="text-slate-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                   </button>
                </div>
              ))}
              {[...Array(3 - compareList.length)].map((_, i) => (
                <div key={i} className={`p-4 rounded-2xl border border-dashed flex items-center justify-center text-xs font-bold ${isDarkMode ? 'border-slate-700 text-slate-600' : 'border-slate-200 text-slate-400'}`}>
                   Add tool
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
