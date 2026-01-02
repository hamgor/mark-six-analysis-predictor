import React, { useState, useMemo } from 'react';
import { RAW_DATA, parseData } from '@/lib/data';
import { MarkSixAnalyzer } from '@/lib/analyzer';
import { RetroCard } from '@/components/ui/retro-card';
import { DrawHistory } from '@/components/DrawHistory';
import { AnalysisCharts } from '@/components/AnalysisCharts';
import { PredictionTerminal } from '@/components/PredictionTerminal';
import { Activity, Database, Cpu, Zap, Globe, Server } from 'lucide-react';
export function HomePage() {
  const [iteration, setIteration] = useState(0);
  const draws = useMemo(() => parseData(RAW_DATA), []);
  const analyzer = useMemo(() => new MarkSixAnalyzer(draws), [draws]);
  const weightedFrequencies = useMemo(() => analyzer.getWeightedFrequencies(), [analyzer]);
  const predictions = useMemo(() => {
    void iteration;
    return analyzer.generatePredictions(3);
  }, [analyzer, iteration]);
  const handleRefresh = () => {
    setIteration(prev => prev + 1);
  };
  const marqueeText = "RETROSIX_ANALYST v2.0 // SYSTEM STATUS: NOMINAL // PROCESSING DRAW BATCHES: " + draws.length + " // ALGORITHM: TEMPORAL_DECAY_WEIGHTED_HEURISTICS // SECURITY: ENCRYPTED // NODE: HK_G01 // ";
  return (
    <div className="relative min-h-screen bg-cyber-navy selection:bg-cyber-neon selection:text-cyber-navy overflow-hidden">
      {/* Visual Overlays */}
      <div className="crt-overlay" />
      <div className="scanline" />
      {/* Header Marquee Bar */}
      <header className="relative z-10 bg-black/60 border-b border-cyber-neon/20 overflow-hidden h-8 flex items-center">
        <div className="animate-marquee whitespace-nowrap text-[10px] tracking-[0.3em] font-bold uppercase text-cyber-neon/80">
          {marqueeText.repeat(10)}
        </div>
      </header>
      {/* Main Status Header */}
      <div className="relative z-10 bg-gradient-to-r from-cyber-navy via-cyber-sapphire/20 to-cyber-navy border-b border-cyber-neon/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-cyber-neon text-[10px] font-bold tracking-widest">
              <Activity size={14} className="animate-pulse" />
              SYSTEM_LINK: ACTIVE
            </span>
            <div className="hidden md:flex items-center gap-2 text-cyber-ice/30 text-[10px] tracking-widest">
              <Server size={12} />
              <span>UPTIME: 99.998%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-cyber-ice text-[10px] font-bold tracking-widest">
            <div className="flex items-center gap-2 px-3 py-1 border border-cyber-neon/20 bg-cyber-neon/5">
              <Zap size={12} className="text-cyber-neon" />
              <span>SYNC_LATENCY: 8ms</span>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Data Log */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <RetroCard
              title="QUANTUM_ARCHIVE"
              className="h-[500px] lg:h-[700px]"
              headerColor="sapphire"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2 text-[10px] text-cyber-ice/40 tracking-widest uppercase">
                  <Database size={12} />
                  <span>TOTAL_VECTORS: {draws.length}</span>
                </div>
                <div className="text-[10px] text-cyber-neon animate-pulse font-bold">STREAMING</div>
              </div>
              <DrawHistory draws={draws} />
            </RetroCard>
            <RetroCard title="KERNEL_STDOUT" className="h-[140px]" headerColor="ice">
              <div className="text-[9px] md:text-[10px] space-y-1.5 text-cyber-ice/50 font-mono leading-tight">
                <p>&gt; BOOTING_CORE_V2.0.4...</p>
                <p>&gt; HOLOGRAPHIC_INTERFACE_SYNC... [100%]</p>
                <p className="text-cyber-neon">&gt; ANALYTIC_ENGINE_STANDBY: READY</p>
                <p className="animate-pulse">&gt; _</p>
              </div>
            </RetroCard>
          </div>
          {/* Center/Right: Analysis and Predictions */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RetroCard
                title="PREDICTION_CORE"
                className="h-[520px]"
                headerColor="neon"
              >
                <PredictionTerminal
                  predictions={predictions}
                  onRefresh={handleRefresh}
                />
              </RetroCard>
              <div className="flex flex-col gap-8">
                <RetroCard title="VECTOR_DISTRIBUTION" headerColor="sapphire" className="h-[320px]">
                  <div className="flex items-center gap-2 mb-4 text-[10px] tracking-widest text-cyber-ice/40 uppercase">
                    <Cpu size={12} />
                    <span>FREQUENCY_HEAT_MAP</span>
                  </div>
                  <AnalysisCharts weightedFrequencies={weightedFrequencies} />
                </RetroCard>
                <RetroCard title="ANALYTIC_PROTOCOLS" headerColor="ice" className="flex-1">
                  <div className="text-[10px] md:text-[11px] space-y-5 font-mono leading-relaxed">
                    <div>
                      <div className="flex justify-between items-center mb-1.5 text-cyber-neon font-bold tracking-widest">
                        <span>P-01: TEMPORAL_DECAY</span>
                        <span className="text-cyber-ice/20">W_1.1^N</span>
                      </div>
                      <p className="text-cyber-ice/60 border-l border-cyber-neon/20 pl-3">
                        Applying a compounding <span className="text-white">10% increase</span> to newer batches. Probability hotspots prioritize recency.
                      </p>
                    </div>
                    <div className="h-[1px] bg-cyber-ice/5" />
                    <div>
                      <div className="flex justify-between items-center mb-1.5 text-cyber-neon font-bold tracking-widest">
                        <span>P-02: HEURISTIC_CLUSTER</span>
                        <span className="text-cyber-ice/20">POOL_18</span>
                      </div>
                      <p className="text-cyber-ice/60 border-l border-cyber-neon/20 pl-3">
                        Isolating the top <span className="text-white">18 weighted frequency nodes</span>. Noise filtering active across {draws.length} datasets.
                      </p>
                    </div>
                  </div>
                </RetroCard>
              </div>
            </div>
            {/* Bottom Status Bar Footer */}
            <RetroCard className="py-4 px-8" headerColor="sapphire">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] md:text-[9px] text-cyber-ice/30 uppercase tracking-[0.4em] font-bold">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-neon shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                  RETROSIX_ANALYST // LUXURY_REVISION_FINAL
                </span>
                <span className="hidden md:inline">SYSTEM_INTEGRITY: 100% // ENCRYPTION_RSA_4096</span>
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