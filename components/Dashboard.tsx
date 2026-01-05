
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '../utils/storage';

const Dashboard: React.FC = () => {
  const routes = storage.getRoutes();
  const profile = storage.getProfile();

  const chartData = [
    { name: 'Lun', km: 1 }, { name: 'Mar', km: 3 }, { name: 'Mer', km: 0 },
    { name: 'Jeu', km: 2 }, { name: 'Ven', km: 4 }, { name: 'Sam', km: 6 }, { name: 'Dim', km: 2 },
  ];

  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-center py-2">
        <div>
          <h1 className="text-3xl font-extrabold text-orange-500 tracking-tight italic">VERTICAL PULSE</h1>
          <p className="text-zinc-400 font-medium">Bon retour, {profile.name} 👋</p>
        </div>
        <div className="w-12 h-12 bg-orange-500/10 rounded-2xl border border-orange-500/30 flex items-center justify-center">
           <i className="fa-solid fa-mountain-climbing text-orange-500 text-xl"></i>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Voies', value: routes.length, icon: 'fa-route', color: 'text-blue-400' },
          { label: 'Max', value: profile.maxGrade, icon: 'fa-bolt', color: 'text-orange-400' },
          { label: 'Sessions', value: '12', icon: 'fa-calendar-check', color: 'text-emerald-400' },
          { label: 'Points', value: routes.length * 150, icon: 'fa-star', color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800/50 p-4 rounded-3xl shadow-sm">
            <div className={`${stat.color} mb-2`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div className="text-2xl font-black">{stat.value}</div>
            <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800/50 p-6 rounded-3xl">
        <h2 className="text-sm font-bold mb-6 flex items-center gap-2 text-zinc-300">
          <i className="fa-solid fa-chart-simple text-orange-500"></i>
          VOLUME DE LA SEMAINE (Voies)
        </h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="km" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800/50 p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Dernières Activités</h2>
          <button className="text-xs text-orange-500 font-bold">Voir tout</button>
        </div>
        <div className="space-y-4">
          {routes.length === 0 ? (
            <p className="text-center py-6 text-zinc-500 text-sm">Aucune grimpe enregistrée.</p>
          ) : (
            routes.slice(0, 3).map(r => (
              <div key={r.id} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center font-bold text-orange-500 border border-zinc-700">
                  {r.grade}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm leading-tight">{r.name}</h4>
                  <p className="text-[10px] text-zinc-500">{r.location} • {r.date}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-zinc-700 text-xs"></i>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
