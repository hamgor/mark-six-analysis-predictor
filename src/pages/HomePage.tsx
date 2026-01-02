import React, { useState, useMemo } from 'react';
import { getCombinedDraws } from '@/lib/data';
import { MarkSixAnalyzer } from '@/lib/analyzer';
import { RetroCard } from '@/components/ui/retro-card';
import { DrawHistory } from '@/components/DrawHistory';
import { AnalysisCharts } from '@/components/AnalysisCharts';
import { PredictionTerminal } from '@/components/PredictionTerminal';
import { ManualEntryForm } from '@/components/ManualEntryForm';
import { RulesSummary } from '@/components/RulesSummary';
import { Radar, Command, ShieldCheck, HardDrive, Cpu, Terminal } from 'lucide-react';
export function HomePage() {
  const [iteration, setIteration] = useState(0);
  const [dataVersion, setDataVersion] = useState(0);
  const [shake, setShake] = useState(false);
  const draws = useMemo(() => {
    void dataVersion;
    return getCombinedDraws();
  }, [dataVersion]);
  const analyzer = useMemo(() => new MarkSixAnalyzer(draws), [draws]);
  const weightedFrequencies = useMemo(() => analyzer.getWeightedFrequencies(), [analyzer]);
  const hotColdStats = useMemo(() => analyzer.getHotColdStats(), [analyzer]);
  const frequentPairs = useMemo(() => analyzer.getFrequentPairs(), [analyzer]);
  const coverageSet = useMemo(() => analyzer.getCoverageSet(), [analyzer]);
  const predictions = useMemo(() => {
    void iteration;
    void dataVersion;
    return analyzer.generatePredictions(3);
  }, [analyzer, iteration, dataVersion]);
  const handleRefresh = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setIteration(prev => prev + 1);
  };
  const handleDataUpdate = () => {
    setDataVersion(prev => prev + 1);
    setIteration(0);
  };
  const marqueeText = "MATRIX_CORE_LINKED // ADAPTIVE_P_DISTRIBUTION: ACTIVE // NODES: " + draws.length + " // DECAY_RATIO: 1.1^N // STATUS: OPTIMIZED // ";
  return (
    <div className={`crt-container ${shake ? 'animate-screen-shake' : ''}`}>
      <div className="matrix-rain" />
      <div className="crt-overlay" />
      <div className="scanline" />
      <div className="crt-screen min-h-screen flex flex-col relative z-10">
        <header className="bg-matrix-dark border-b-4 border-matrix-dim h-10 flex items-center overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-xs tracking-[0.4em] font-black uppercase text-matrix-green">
            {marqueeText.repeat(20)}
          </div>
        </header>
        <div className="bg-black/60 border-b-2 border-matrix-dim/30 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-3 text-matrix-green text-xs font-black tracking-widest">
                <Radar size={20} className="animate-radar-spin text-matrix-green" />
                SYSTEM_UPLINK_STABLE
              </span>
              <div className="hidden lg:flex items-center gap-4 text-matrix-dim text-[10px] tracking-widest">
                <div className="flex items-center gap-2"><Cpu size={14} /> <span>CPU: 42%</span></div>
                <div className="flex items-center gap-2"><HardDrive size={14} /> <span>DISK: OK</span></div>
              </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3 px-4 py-1.5 border-2 border-matrix-green bg-matrix-green/10 text-matrix-green text-xs font-black">
                <ShieldCheck size={16} />
                <span>SYNC_NODES: {draws.length}</span>
              </div>
            </div>
          </div>
        </div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Control Panel Section */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <RetroCard
                title="MAINFRAME_ARCHIVE"
                className="h-[600px]"
                animate={false}
              >
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex items-center gap-2 text-xs text-matrix-dim font-black tracking-widest uppercase">
                    <Command size={14} />
                    <span>ENTRIES: {draws.length}</span>
                  </div>
                  <div className="text-[10px] bg-matrix-green text-black px-2 font-black animate-pulse">LIVE</div>
                </div>
                <DrawHistory draws={draws} />
              </RetroCard>
              <RetroCard title="MANUAL_DATA_INPUT" animate={true}>
                <div className="flex items-center gap-2 mb-4 text-xs tracking-widest text-matrix-dim uppercase font-black">
                  <Terminal size={14} />
                  <span>OVERRIDE_VECTORS</span>
                </div>
                <ManualEntryForm onSuccess={handleDataUpdate} />
              </RetroCard>
            </div>
            {/* Analysis Center Section */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <RetroCard
                  title="PREDICTION_READOUT"
                  className="h-[550px]"
                  animate={false}
                >
                  <PredictionTerminal
                    predictions={predictions}
                    onRefresh={handleRefresh}
                  />
                </RetroCard>
                <div className="flex flex-col gap-10">
                  <RetroCard title="P_DISTRIBUTION" className="h-[280px]" animate={true}>
                    <AnalysisCharts weightedFrequencies={weightedFrequencies} />
                  </RetroCard>
                  <RetroCard title="HEURISTIC_INSIGHTS" className="flex-1" animate={true}>
                    <RulesSummary
                      stats={hotColdStats}
                      pairs={frequentPairs}
                      coverage={coverageSet}
                    />
                  </RetroCard>
                </div>
              </div>
              {/* Console Footer Info */}
              <RetroCard className="py-5" animate={false}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-matrix-dim uppercase tracking-[0.5em] font-black">
                  <span className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-matrix-green shadow-[0_0_10px_#00FF41] animate-pulse" />
                    RETROSIX_ANALYST_MARK_IV
                  </span>
                  <span className="hidden md:inline">KERNEL_BUILD: 2025.4.24 // VECTOR_POOL: 49</span>
                  <span className="opacity-50">© 1988-2025 CYBER-MIL SPEC</span>
                </div>
              </RetroCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}