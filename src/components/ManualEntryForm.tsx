import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
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
    // Validation: Exactly 6 primary numbers required
    if (parsedNums.length < 6) {
      setError("PRIMARY_VECTORS_INCOMPLETE");
      return;
    }
    // Range check: 1-49
    if (parsedNums.some(n => n < 1 || n > 49)) {
      setError("OUT_OF_BOUNDS: RANGE_1_49");
      return;
    }
    if (!isNaN(parsedSpecial) && (parsedSpecial < 1 || parsedSpecial > 49)) {
      setError("SPECIAL_VECTOR_OUT_OF_BOUNDS: 1_49");
      return;
    }
    // Uniqueness check: Handle optional special number correctly
    const primarySet = new Set(parsedNums);
    if (primarySet.size !== 6) {
      setError("COLLISION_DETECTED: DUPLICATE_PRIMARY_NODES");
      return;
    }
    if (!isNaN(parsedSpecial) && primarySet.has(parsedSpecial)) {
      setError("COLLISION_DETECTED: SPECIAL_NODE_EXISTS_IN_PRIMARY");
      return;
    }
    setStatus('uplinking');
    try {
      // Simulation delay for "uplink" feel
      await new Promise(r => setTimeout(r, 1200));
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
      setError("UPLINK_PROTOCOL_FAILURE");
      setStatus('error');
    }
  };
  const handleClear = () => {
    if (confirm("WIPE_LOCAL_DATA_ARCHIVE? THIS ACTION IS IRREVERSIBLE.")) {
      clearCustomDraws();
      onSuccess();
    }
  };
  return (
    <div className="space-y-4 font-mono">
      <form onSubmit={handleUplink} className="space-y-4">
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
              placeholder="00"
              className="bg-cyber-navy/50 border border-cyber-sapphire/40 text-center py-2 text-cyber-ice focus:border-cyber-neon focus:outline-none transition-colors placeholder:text-cyber-ice/20"
            />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-[9px] uppercase tracking-widest text-cyber-ice/40 mb-1 block">Special_Vector</label>
            <input
              type="number"
              value={special}
              onChange={(e) => setSpecial(e.target.value.slice(0, 2))}
              placeholder="00"
              className="w-full bg-cyber-navy/50 border border-cyber-accent/40 text-center py-2 text-cyber-ice focus:border-cyber-neon focus:outline-none transition-colors placeholder:text-cyber-ice/20"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'uplinking'}
            className={cn(
              "flex-[2] mt-5 py-2 px-4 uppercase tracking-tighter font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2",
              status === 'uplinking' ? "bg-cyber-sapphire/20 text-cyber-ice/50 cursor-not-allowed" : "bg-cyber-neon/10 border border-cyber-neon/40 text-cyber-neon hover:bg-cyber-neon hover:text-cyber-navy"
            )}
          >
            {status === 'uplinking' ? (
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-cyber-neon animate-bounce" />
                <div className="w-1 h-1 bg-cyber-neon animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-cyber-neon animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <><Upload size={14} /> [UPLINK_DATA]</>
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-[10px] text-red-400 bg-red-400/5 p-2 border border-red-400/20 animate-pulse">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-[10px] text-cyber-neon bg-cyber-neon/5 p-2 border border-cyber-neon/20 animate-glitch">
          <CheckCircle2 size={12} />
          <span>SYNCHRONIZATION_COMPLETE</span>
        </div>
      )}
      <button
        onClick={handleClear}
        className="w-full py-1 text-[8px] uppercase tracking-[0.3em] text-cyber-ice/20 hover:text-red-400 transition-colors flex items-center justify-center gap-2 group"
      >
        <Trash2 size={10} className="opacity-50 group-hover:opacity-100" />
        [ERASE_USER_VECTORS]
      </button>
    </div>
  );
}