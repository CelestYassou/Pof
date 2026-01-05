
import React, { useState } from 'react';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import RouteLog from './components/RouteLog';
import MapExplorer from './components/MapExplorer';
import PhotoAnnotator from './components/PhotoAnnotator';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'log': return <RouteLog />;
      case 'spots': return <MapExplorer />;
      case 'annotate': return <PhotoAnnotator />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', icon: 'fa-house', label: 'Home' },
    { id: 'log', icon: 'fa-layer-group', label: 'Journal' },
    { id: 'annotate', icon: 'fa-camera-retro', label: 'Crux' },
    { id: 'spots', icon: 'fa-map-location-dot', label: 'Spots' },
    { id: 'profile', icon: 'fa-user-astronaut', label: 'Moi' },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen relative px-5 pt-4 flex flex-col">
      <main className="flex-1 pb-24">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          {renderView()}
        </div>
      </main>

      {/* Barre de Navigation Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
        <div className="max-w-md w-full glass border-t border-white/5 px-6 py-4 flex justify-between items-center rounded-t-[2.5rem] shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                activeView === item.id ? 'text-orange-500 -translate-y-1' : 'text-zinc-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg transition-colors ${activeView === item.id ? 'bg-orange-500/10' : ''}`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${activeView === item.id ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* FAB (Floating Action Button) de log rapide */}
      {activeView !== 'log' && (
        <button 
            className="fixed bottom-28 right-6 w-14 h-14 bg-orange-500 text-white rounded-[1.5rem] shadow-2xl shadow-orange-500/30 flex items-center justify-center text-xl z-40 active:scale-90 transition-transform md:hidden"
            onClick={() => setActiveView('log')}
        >
            <i className="fa-solid fa-plus"></i>
        </button>
      )}
    </div>
  );
};

export default App;
