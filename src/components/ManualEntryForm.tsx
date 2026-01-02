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
    if (new Set(parsedNums).size !== parsedNums.length) {
      setError("Duplicate primary numbers detected");
      return;
    }
    if (!isNaN(parsedSpecial) && (parsedSpecial < 1 || parsedSpecial > 49)) {
      setError("Special number must be between 1 and 49");
      return;
    }
    setStatus('loading');
    try {
      // Simulate validation/processing delay
      await new Promise(r => setTimeout(r, 600));
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
      setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      setError("Failed to save entry. Check system storage.");
      setStatus('error');
    }
  };
  const handleNumChange = (index: number, value: string) => {
    const val = value.slice(0, 2);
    const newNums = [...nums];
    newNums[index] = val;
    setNums(newNums);
    if (error) setError(null);
  };
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-6 gap-2">
          {nums.map((v, i) => (
            <Input
              key={`input-num-${i}`}
              type="number"
              min="1"
              max="49"
              value={v}
              onChange={(e) => handleNumChange(i, e.target.value)}
              className="text-center font-bold px-0 h-10 border-slate-200 focus-visible:ring-cf-orange transition-all hover:border-cf-orange/30"
              placeholder="00"
            />
          ))}
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Special (Opt)</label>
            <Input
              type="number"
              min="1"
              max="49"
              value={special}
              onChange={(e) => setSpecial(e.target.value.slice(0, 2))}
              className="text-center font-bold h-10 border-slate-200 focus-visible:ring-cf-orange transition-all hover:border-cf-orange/30"
              placeholder="00"
            />
          </div>
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="flex-[2] h-10 bg-cf-orange hover:bg-cf-orange/90 text-white font-bold shadow-sm active:scale-95 transition-transform"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4 animate-spin" /> Processing...
              </span>
            ) : (
              "Add Entry"
            )}
          </Button>
        </div>
      </form>
      <div className="min-h-[40px]">
        {error && (
          <div className="flex items-center gap-2 text-xs bg-red-50 text-red-700 p-3 rounded-md border border-red-100 animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={14} className="shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}
        {status === 'success' && (
          <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 p-3 rounded-md border border-green-100 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 size={14} className="shrink-0" />
            <span className="font-semibold">Entry recorded successfully</span>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => { if(confirm("Permanently clear all local entries?")) { clearCustomDraws(); onSuccess(); } }}
        className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-red-600 transition-colors flex items-center justify-center gap-2 group opacity-60 hover:opacity-100"
      >
        <Trash2 size={12} className="group-hover:animate-bounce" />
        Purge Local Data
      </button>
    </div>
  );
}