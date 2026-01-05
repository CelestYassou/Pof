
import React, { useState } from 'react';
import { storage } from '../utils/storage';

const Profile: React.FC = () => {
  const profile = storage.getProfile();
  const routes = storage.getRoutes();
  const [showQR, setShowQR] = useState(false);

  // QR Code généré dynamiquement via une API gratuite
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://verticalpulse.app/user/${profile.handle}&bgcolor=ffffff&color=09090b`;

  return (
    <div className="space-y-8 pb-24">
      <div className="relative pt-12 pb-6 px-2">
         <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-orange-600 to-zinc-900 rounded-[2.5rem] -z-10"></div>
         <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-[2rem] border-8 border-zinc-950 overflow-hidden shadow-2xl bg-zinc-800 mb-4">
               <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight">{profile.name}</h1>
            <p className="text-orange-500 font-bold text-sm tracking-widest uppercase">@{profile.handle}</p>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Voies', val: routes.length },
          { label: 'Max', val: profile.maxGrade },
          { label: 'Min', val: profile.minGrade },
        ].map((s, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800/50 p-4 rounded-3xl text-center shadow-sm">
            <div className="text-xl font-black">{s.val}</div>
            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="text-center text-zinc-400 text-sm italic px-6">"{profile.bio}"</p>

      <div className="space-y-3">
        <button 
          onClick={() => setShowQR(true)}
          className="w-full bg-white text-zinc-950 py-4 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-qrcode"></i>
          PARTAGER MA FICHE QR
        </button>
        <button className="w-full bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-black text-sm uppercase tracking-widest">
          Modifier mon profil
        </button>
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-black uppercase text-zinc-500 mb-4 tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-trophy text-orange-500"></i>
          Badges & Succès
        </h3>
        <div className="grid grid-cols-4 gap-4">
           {[
             { icon: 'fa-mountain', active: true, label: 'Alpiniste' },
             { icon: 'fa-hand-back-fist', active: true, label: 'Force' },
             { icon: 'fa-bolt', active: false, label: 'Vitesse' },
             { icon: 'fa-fire', active: true, label: 'Projet' },
           ].map((b, i) => (
             <div key={i} className="flex flex-col items-center gap-2">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg ${b.active ? 'bg-orange-500/10 text-orange-500 border border-orange-500/30' : 'bg-zinc-900 text-zinc-800 border border-zinc-800 opacity-40'}`}>
                 <i className={`fa-solid ${b.icon}`}></i>
               </div>
               <span className="text-[8px] font-bold uppercase text-zinc-600">{b.label}</span>
             </div>
           ))}
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowQR(false)}>
          <div className="bg-zinc-100 p-8 rounded-[3rem] w-full max-w-sm flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <div className="bg-zinc-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 tracking-widest">VerticalPulse ID</div>
            <div className="bg-white p-4 rounded-3xl shadow-2xl mb-6">
               <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
            </div>
            <p className="text-zinc-500 text-xs font-bold text-center mb-8 uppercase tracking-widest">Scanne pour m'ajouter sur l'app !</p>
            <button onClick={() => setShowQR(false)} className="w-full bg-zinc-950 text-white py-4 rounded-2xl font-black shadow-xl">FERMER</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
