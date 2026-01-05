
import React, { useState, useRef, useEffect } from 'react';

const PhotoAnnotator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<{x: number, y: number, emoji: string}[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState('🦶');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setAnnotations([...annotations, { x, y, emoji: selectedEmoji }]);
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        if (ctx && canvasRef.current) {
          const displayWidth = canvasRef.current.clientWidth;
          const scale = img.width / displayWidth;
          canvasRef.current.width = displayWidth;
          canvasRef.current.height = img.height / scale;
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          
          annotations.forEach(ann => {
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ann.emoji, ann.x, ann.y);
          });
        }
      };
    }
  }, [image, annotations]);

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-black italic">CRUX MASTER</h1>
      <p className="text-zinc-500 text-sm -mt-4">Annote ton projet pour ne pas oublier la méthode.</p>

      {!image ? (
        <div className="h-80 border-4 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center bg-zinc-900/40 relative">
          <input type="file" id="climb-img" className="hidden" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="climb-img" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black cursor-pointer shadow-2xl shadow-orange-500/20 active:scale-95 transition-transform">
            CHARGER UNE PHOTO
          </label>
          <i className="fa-solid fa-camera text-4xl text-zinc-800 mt-6"></i>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['🦶', '🖐️', '🔥', '💪', '🧗', '❌', '➡️', '⭕'].map(emoji => (
              <button 
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`flex-shrink-0 w-12 h-12 rounded-xl text-xl flex items-center justify-center transition-all ${selectedEmoji === emoji ? 'bg-orange-500 scale-110 shadow-lg' : 'bg-zinc-800 opacity-60'}`}
              >
                {emoji}
              </button>
            ))}
            <button onClick={() => setAnnotations([])} className="bg-red-500/20 text-red-500 text-xs font-bold px-4 rounded-xl ml-auto uppercase tracking-wider">Reset</button>
          </div>
          
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-zinc-900 shadow-2xl shadow-black/50">
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full cursor-crosshair" />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button className="bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-bold text-zinc-500" onClick={() => setImage(null)}>Changer de photo</button>
             <button className="bg-orange-500 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 uppercase tracking-widest text-sm" onClick={() => alert('Analyse sauvegardée !')}>Partager Crux</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAnnotator;
