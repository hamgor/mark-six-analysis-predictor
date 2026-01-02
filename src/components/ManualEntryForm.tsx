import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';
import { Draw, saveCustomDraw, clearCustomDraws } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface ManualEntryFormProps {
  onSuccess: () => void;
}
export function ManualEntryForm({ onSuccess }: ManualEntryFormProps) {
  const [nums, setNums] = useState<string[]>(['', '', '', '', '', '']);
  const [special, setSpecial] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const resetForm = () => {
    setNums(['', '', '', '', '', '']);
    setSpecial('');
    setError(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsedNums = nums.map(n => parseInt(n, 10)).filter(n => !isNaN(n));
    const parsedSpecial = parseInt(special, 10);
    if (parsedNums.length < 6) {
      setError("Please enter all 6 primary numbers");
      return;
    }
    if (parsedNums.some(n => n < 1 || n > 49)) {
      setError("Numbers must be between 1 and 49");
      return;
    }
    setStatus('loading');
    try {
      await new Promise(r => setTimeout(r, 800));
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
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setError("Failed to save entry");
      setStatus('error');
    }
  };
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-6 gap-2">
          {nums.map((v, i) => (
            <Input
              key={i}
              type="number"
              value={v}
              onChange={(e) => {
                const newNums = [...nums];
                newNums[i] = e.target.value.slice(0, 2);
                setNums(newNums);
              }}
              className="text-center font-bold px-0 h-10 border-slate-200 focus-visible:ring-cf-orange"
              placeholder="00"
            />
          ))}
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Special (Optional)</label>
            <Input
              type="number"
              value={special}
              onChange={(e) => setSpecial(e.target.value.slice(0, 2))}
              className="text-center font-bold h-10 border-slate-200 focus-visible:ring-cf-orange"
              placeholder="00"
            />
          </div>
          <Button 
            type="submit" 
            disabled={status === 'loading'}
            className="flex-[2] h-10 bg-cf-orange hover:bg-cf-orange/90 text-white font-bold"
          >
            {status === 'loading' ? "Saving..." : "Add Entry"}
          </Button>
        </div>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-xs bg-red-50 text-red-700 p-3 rounded-md border border-red-100">
          <AlertCircle size={14} />
          <span className="font-semibold">{error}</span>
        </div>
      )}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 p-3 rounded-md border border-green-100">
          <CheckCircle2 size={14} />
          <span className="font-semibold">Entry recorded successfully</span>
        </div>
      )}
      <button
        onClick={() => { if(confirm("Permanently clear all local entries?")) { clearCustomDraws(); onSuccess(); } }}
        className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-red-600 transition-colors flex items-center justify-center gap-2 group"
      >
        <Trash2 size={12} className="group-hover:animate-pulse" />
        Purge Local Data
      </button>
    </div>
  );
}