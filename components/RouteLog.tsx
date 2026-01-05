
import React, { useState } from 'react';
import { storage } from '../utils/storage';
import { ClimbRoute } from '../types';
import { GRADES } from '../constants';

const RouteLog: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [routes, setRoutes] = useState(storage.getRoutes());
  
  const [formData, setFormData] = useState({
    name: '', grade: '6a', location: '', time: 0, partners: '', gear: '', notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoute: ClimbRoute = {
      id: Date.now().toString(),
      name: formData.name,
      grade: formData.grade,
      location: formData.location,
      time: formData.time,
      date: new Date().toLocaleDateString('fr-FR'),
      partners: formData.partners.split(',').map(p => p.trim()),
      gear: formData.gear.split(',').map(g => g.trim()),
      notes: formData.notes
    };
    storage.saveRoute(newRoute);
    setRoutes([newRoute, ...routes]);
    setShowForm(false);
    setFormData({ name: '', grade: '6a', location: '', time: 0, partners: '', gear: '', notes: '' });
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black italic">ACTIVITÉ</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
        >
          <i className={`fa-solid ${showForm ? 'fa-xmark' : 'fa-plus'}`}></i>
          {showForm ? 'Annuler' : 'Log'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-3xl border border-orange-500/20 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <input 
            required placeholder="Nom de la voie"
            className="w-full bg-zinc-800 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500" 
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-3">
            <select 
              className="bg-zinc-800 border-none rounded-xl p-4 text-sm"
              value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}
            >
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input 
              placeholder="Lieu"
              className="bg-zinc-800 border-none rounded-xl p-4 text-sm" 
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="number" placeholder="Temps (min)"
              className="bg-zinc-800 border-none rounded-xl p-4 text-sm" 
              value={formData.time || ''} onChange={e => setFormData({...formData, time: parseInt(e.target.value)})}
            />
            <input 
              placeholder="Partenaires"
              className="bg-zinc-800 border-none rounded-xl p-4 text-sm" 
              value={formData.partners} onChange={e => setFormData({...formData, partners: e.target.value})}
            />
          </div>
          <input 
            placeholder="Matériel (ex: Crashpad, Baudrier...)"
            className="w-full bg-zinc-800 border-none rounded-xl p-4 text-sm" 
            value={formData.gear} onChange={e => setFormData({...formData, gear: e.target.value})}
          />
          <textarea 
            placeholder="Comment s'est passée la grimpe ?"
            className="w-full bg-zinc-800 border-none rounded-xl p-4 text-sm h-24"
            value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}
          ></textarea>
          <button className="w-full bg-orange-500 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl">Enregistrer la séance</button>
        </form>
      )}

      <div className="space-y-4">
        {routes.map(r => (
          <div key={r.id} className="bg-zinc-900 border border-zinc-800/50 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-5 flex items-start gap-4">
               <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-xl font-black text-orange-500 italic">
                    {r.grade}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">France</span>
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold leading-tight">{r.name}</h3>
                    <span className="text-[10px] font-bold text-zinc-600 bg-zinc-800 px-2 py-1 rounded-lg uppercase">{r.date}</span>
                  </div>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                    <i className="fa-solid fa-location-dot text-orange-500/50"></i> {r.location}
                  </p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {r.time > 0 && <span className="bg-zinc-800 text-[9px] px-2 py-1 rounded-md text-zinc-400 font-bold uppercase border border-zinc-700">{r.time} min</span>}
                    {r.partners[0] && <span className="bg-zinc-800 text-[9px] px-2 py-1 rounded-md text-zinc-400 font-bold uppercase border border-zinc-700">w/ {r.partners.join(', ')}</span>}
                  </div>
               </div>
            </div>
            {r.notes && <div className="px-5 pb-5 pt-0 text-sm text-zinc-400 border-t border-zinc-800/50 mt-1 italic">"{r.notes}"</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteLog;
