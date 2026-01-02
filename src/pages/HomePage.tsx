import React, { useState, useMemo } from 'react';
import { getCombinedDraws } from '@/lib/data';
import { MarkSixAnalyzer } from '@/lib/analyzer';
import { RetroCard } from '@/components/ui/retro-card';
import { DrawHistory } from '@/components/DrawHistory';
import { AnalysisCharts } from '@/components/AnalysisCharts';
import { PredictionTerminal } from '@/components/PredictionTerminal';
import { ManualEntryForm } from '@/components/ManualEntryForm';
import { RulesSummary } from '@/components/RulesSummary';
import { Activity, Database, Zap, Globe, Server, Terminal } from 'lucide-react';
export function HomePage() {
  const [iteration, setIteration] = useState(0);
  const [dataVersion, setDataVersion] = useState(0);
  const draws = useMemo(() => {
    // dataVersion is used as a trigger for re-memoizing
    void dataVersion;
    return getCombinedDraws();
  }, [dataVersion]);
  const analyzer = useMemo(() => new MarkSixAnalyzer(draws), [draws]);
  const weightedFrequencies = useMemo(() => analyzer.getWeightedFrequencies(), [analyzer]);
  const hotColdStats = useMemo(() => analyzer.getHotColdStats(), [analyzer]);
  const frequentPairs = useMemo(() => analyzer.getFrequentPairs(), [analyzer]);
  const coverageSet = useMemo(() => analyzer.getCoverageSet(), [analyzer]);
  const predictions = useMemo(() => {
    // iteration and dataVersion trigger re-calculation
    void iteration;
    void dataVersion;
    return analyzer.generatePredictions(3);
  }, [analyzer, iteration, dataVersion]);
  const handleRefresh = () => setIteration(prev => prev + 1);
  const handleDataUpdate = () => {
    setDataVersion(prev => prev + 1);
    // Explicitly reset iteration to sync fresh data predictions
    setIteration(0);
  };
  const marqueeText = "RETROSIX_ANALYST v2.1 // STATUS: OPTIMIZED // BATCHES_SYNCED: " + draws.length + " // ALGORITHM: TEMPORAL_DECAY_1.1N // ";
  return (
    <div className="relative min-h-screen bg-cyber-navy selection:bg-cyber-neon selection:text-cyber-navy overflow-hidden">
      <div className="crt-overlay" />
      <div className="scanline" />
      <header className="relative z-10 bg-black/60 border-b border-cyber-neon/20 overflow-hidden h-8 flex items-center">
        <div className="animate-marquee whitespace-nowrap text-[10px] tracking-[0.4em] font-bold uppercase text-cyber-neon/80">
          {marqueeText.repeat(15)}
        </div>
      </header>
      <div className="relative z-10 bg-gradient-to-r from-cyber-navy via-cyber-sapphire/20 to-cyber-navy border-b border-cyber-neon/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-cyber-neon text-[10px] font-bold tracking-widest">
              <Activity size={14} className="animate-pulse" />
              SYSTEM_LINK: ACTIVE
            </span>
            <div className="hidden md:flex items-center gap-2 text-cyber-ice/30 text-[10px] tracking-widest">
              <Server size={12} />
              <span>UPTIME: 99.999%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-cyber-ice text-[10px] font-bold tracking-widest">
            <div className="flex items-center gap-2 px-3 py-1 border border-cyber-neon/20 bg-cyber-neon/5">
              <Zap size={12} className="text-cyber-neon" />
              <span>SYNC: {draws.length} NODES</span>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Side: Archive & Uplink */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <RetroCard
              title="QUANTUM_ARCHIVE"
              className="h-[500px] lg:h-[600px]"
              headerColor="sapphire"
              animate={false} // Ground the large archive
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2 text-[10px] text-cyber-ice/40 tracking-widest uppercase">
                  <Database size={12} />
                  <span>TOTAL_VECTORS: {draws.length}</span>
                </div>
                <div className="text-[10px] text-cyber-neon animate-pulse font-bold tracking-tighter">LIVE_FEED</div>
              </div>
              <DrawHistory draws={draws} />
            </RetroCard>
            <RetroCard title="MANUAL_UPLINK" headerColor="neon" animate={true}>
              <div className="flex items-center gap-2 mb-4 text-[10px] tracking-widest text-cyber-ice/40 uppercase">
                <Terminal size={12} />
                <span>INJECT_CUSTOM_DATA</span>
              </div>
              <ManualEntryForm onSuccess={handleDataUpdate} />
            </RetroCard>
          </div>
          {/* Right Side: Prediction & Analysis */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RetroCard
                title="PREDICTION_CORE"
                className="h-[520px]"
                headerColor="neon"
                animate={false} // Ground the core output
              >
                <PredictionTerminal
                  predictions={predictions}
                  onRefresh={handleRefresh}
                />
              </RetroCard>
              <div className="flex flex-col gap-8">
                <RetroCard title="VECTOR_DISTRIBUTION" headerColor="sapphire" className="h-[280px]" animate={true}>
                  <AnalysisCharts weightedFrequencies={weightedFrequencies} />
                </RetroCard>
                <RetroCard title="ANALYTIC_INSIGHTS" headerColor="ice" className="flex-1" animate={true}>
                  <RulesSummary
                    stats={hotColdStats}
                    pairs={frequentPairs}
                    coverage={coverageSet}
                  />
                </RetroCard>
              </div>
            </div>
            <RetroCard className="py-4 px-8" headerColor="sapphire" animate={false}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[9px] text-cyber-ice/30 uppercase tracking-[0.4em] font-bold">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-neon shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                  SYSTEM_CORE: RETROSIX_ANALYST_FINAL
                </span>
                <span className="hidden md:inline">ADAPTIVE_P_DISTRIBUTION: ACTIVE // POOL: 49</span>
                <span className="flex items-center gap-2">
                  <Globe size={10} />
                  © 1994-2025 CYBER-CORE SYSTEMS LTD.
                </span>
              </div>
            </RetroCard>
          </div>
        </div>
      </main>
    </div>
  );
}