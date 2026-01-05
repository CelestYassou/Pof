
import React, { useState } from 'react';
import { storage } from '../utils/storage';

const MapExplorer: React.FC = () => {
  const spots = storage.getSpots();
  const [selectedSpot, setSelectedSpot] = useState(spots[0]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-black italic">MES SPOTS</h1>
        <button className="bg-orange-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="flex-1 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
            {spots.map((spot, i) => (
                <button 
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`absolute p-3 rounded-2xl border-2 transition-all shadow-xl ${selectedSpot?.id === spot.id ? 'bg-orange-500 border-white scale-125 z-10' : 'bg-zinc-950 border-orange-500/50 hover:scale-110'}`}
                  style={{ top: `${25 + i * 18}%`, left: `${20 + i * 22}%` }}
                >
                  <i className="fa-solid fa-mountain text-white text-xs"></i>
                </button>
            ))}
        </div>

        {selectedSpot && (
            <div className="absolute bottom-6 left-6 right-6 glass border border-white/5 p-6 rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="text-orange-500 text-[10px] uppercase font-black tracking-widest">{selectedSpot.type}</span>
                        <h3 className="font-black text-xl leading-tight uppercase italic">{selectedSpot.name}</h3>
                    </div>
                    <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800">
                       <i className="fa-solid fa-directions text-orange-500"></i>
                    </div>
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed line-clamp-2">{selectedSpot.description}</p>
                <div className="flex gap-2">
                    <button className="flex-1 bg-orange-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">Voir les voies</button>
                    <button className="flex-1 bg-zinc-800 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">Topo</button>
                </div>
            </div>
        )}
      </div>

      <div className="shrink-0 flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {spots.map(spot => (
            <button 
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className={`shrink-0 w-36 p-4 rounded-2xl border text-left transition-all ${selectedSpot?.id === spot.id ? 'bg-orange-500/10 border-orange-500' : 'bg-zinc-900 border-zinc-800'}`}
            >
                <div className="text-[8px] text-zinc-500 uppercase font-black mb-1">{spot.type}</div>
                <div className="font-bold truncate text-sm">{spot.name}</div>
            </button>
        ))}
      </div>
    </div>
  );
};

export default MapExplorer;
