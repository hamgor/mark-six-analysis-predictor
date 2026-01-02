import React, { useState } from 'react';
import { Power, ShieldAlert, CheckSquare, RotateCcw } from 'lucide-react';
import { Draw, saveCustomDraw, clearCustomDraws } from '@/lib/data';
import { cn } from '@/lib/utils';
interface ManualEntryFormProps {
  onSuccess: () => void;
}
export function ManualEntryForm({ onSuccess }: ManualEntryFormProps) {
  const [nums, setNums] = useState<string[]>(['', '', '', '', '', '']);
  const [special, setSpecial] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'uplinking' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const resetForm = () => {
    setNums(['', '', '', '', '', '']);
    setSpecial('');
    setError(null);
  };
  const handleUplink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsedNums = nums.map(n => parseInt(n, 10)).filter(n => !isNaN(n));
    const parsedSpecial = parseInt(special, 10);
    if (parsedNums.length < 6) {
      setError("ERR: INCOMPLETE_VECTORS");
      return;
    }
    if (parsedNums.some(n => n < 1 || n > 49)) {
      setError("ERR: BOUNDS_VIOLATION");
      return;
    }
    setStatus('uplinking');
    try {
      await new Promise(r => setTimeout(r, 1000));
      const newDraw: Draw = {
        id: `user-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        numbers: [...parsedNums].sort((a, b) => a - b),
        special: isNaN(parsedSpecial) ? undefined : parsedSpecial
      };
      saveCustomDraw(newDraw);
      setStatus('success');
      resetForm();
      onSuccess();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setError("ERR: TRANSMISSION_FAILED");
      setStatus('error');
    }
  };
  return (
    <div className="space-y-6 font-mono">
      <form onSubmit={handleUplink} className="space-y-6">
        <div className="grid grid-cols-6 gap-2">
          {nums.map((v, i) => (
            <input
              key={i}
              type="number"
              value={v}
              onChange={(e) => {
                const newNums = [...nums];
                newNums[i] = e.target.value.slice(0, 2);
                setNums(newNums);
              }}
              className="bg-black border-2 border-matrix-dim text-center py-3 text-matrix-green focus:border-matrix-green focus:bg-matrix-green/10 focus:outline-none transition-all font-black text-lg"
              placeholder="--"
            />
          ))}
        </div>
        <div className="flex items-end gap-4">
          <div className="w-1/3">
            <label className="text-[10px] uppercase tracking-widest text-matrix-dim mb-2 block">EXT_BIT</label>
            <input
              type="number"
              value={special}
              onChange={(e) => setSpecial(e.target.value.slice(0, 2))}
              className="w-full bg-black border-2 border-matrix-dim text-center py-3 text-matrix-green focus:border-matrix-green focus:outline-none font-black text-lg"
              placeholder="--"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'uplinking'}
            className={cn(
              "flex-1 py-3 px-6 uppercase font-black text-sm transition-all border-[4px] shadow-[4px_4px_0px_#003B00] active:translate-y-1 active:shadow-none",
              status === 'uplinking' 
                ? "bg-matrix-dim/20 border-matrix-dim text-matrix-dim cursor-not-allowed" 
                : "bg-matrix-dark border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black"
            )}
          >
            {status === 'uplinking' ? "COMM_SYNC..." : "[ EXEC_UPLOAD ]"}
          </button>
        </div>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-xs text-black bg-red-600 p-2 font-black uppercase animate-screen-shake">
          <ShieldAlert size={16} />
          <span>{error}</span>
        </div>
      )}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-xs text-black bg-matrix-green p-2 font-black uppercase">
          <Power size={16} className="animate-pulse" />
          <span>UPLOAD_COMPLETE</span>
        </div>
      )}
      <button
        onClick={() => { if(confirm("CLEAR ALL DATA?")) { clearCustomDraws(); onSuccess(); } }}
        className="w-full py-2 text-[10px] uppercase tracking-[0.3em] text-matrix-dim hover:text-red-500 transition-colors flex items-center justify-center gap-2"
      >
        <RotateCcw size={12} />
        PURGE_LOCAL_RECORDS
      </button>
    </div>
  );
}