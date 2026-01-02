import React, { useState, useMemo } from 'react';
import { RAW_DATA, parseData } from '@/lib/data';
import { MarkSixAnalyzer } from '@/lib/analyzer';
import { RetroCard } from '@/components/ui/retro-card';
import { DrawHistory } from '@/components/DrawHistory';
import { AnalysisCharts } from '@/components/AnalysisCharts';
import { PredictionTerminal } from '@/components/PredictionTerminal';
import { Activity, Database, Cpu, Zap, Globe } from 'lucide-react';
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
  return (
    <div className="relative min-h-screen bg-cyber-navy selection:bg-cyber-neon selection:text-cyber-navy">
      {/* Visual Overlays */}
      <div className="crt-overlay" />
      <div className="scanline" />
      {/* Header Marquee */}
      <header className="relative z-10 bg-gradient-to-r from-cyber-navy via-cyber-sapphire/30 to-cyber-navy border-b border-cyber-neon/20 p-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] tracking-[0.4em] font-bold uppercase">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-cyber-neon">
              <Activity size={14} className="animate-pulse" />
              SYSTEM_LINK: ESTABLISHED
            </span>
            <span className="hidden lg:flex items-center gap-2 text-cyber-ice/40">
              <Globe size={14} />
              NODE_HK_G01
            </span>
          </div>
          <div className="flex items-center gap-4 text-cyber-ice">
            <div className="flex items-center gap-2 px-3 py-0.5 border border-cyber-ice/20 bg-cyber-ice/5">
              <Zap size={12} className="text-cyber-neon" />
              <span>SYNC_LATENCY: 12ms</span>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Data Log */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <RetroCard
              title="QUANTUM_ARCHIVE"
              className="h-[450px] lg:h-[650px]"
              headerColor="sapphire"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2 text-[10px] text-cyber-ice/50 tracking-widest">
                  <Database size={12} />
                  <span>RECORDS_FOUND: {draws.length}</span>
                </div>
                <div className="text-[10px] text-cyber-neon animate-pulse">LIVE_FEED</div>
              </div>
              <DrawHistory draws={draws} />
            </RetroCard>
            <RetroCard title="KERNEL_STDOUT" className="h-[140px]" headerColor="ice">
              <div className="text-[10px] space-y-1.5 text-cyber-ice/60 font-mono">
                <p>&gt; INITIALIZING CYBER_LUXURY_CORE...</p>
                <p>&gt; LOADING_HOLOGRAPHIC_BUFFERS... [DONE]</p>
                <p className="text-cyber-neon">&gt; ACCESS_GRANTED: HK_MARK_SIX_ANALYTICS</p>
                <p className="animate-pulse">&gt; _</p>
              </div>
            </RetroCard>
          </div>
          {/* Center/Right: Analysis and Predictions */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RetroCard
                title="PREDICTION_INTERFACE"
                className="h-[480px]"
                headerColor="neon"
              >
                <PredictionTerminal
                  predictions={predictions}
                  onRefresh={handleRefresh}
                />
              </RetroCard>
              <div className="flex flex-col gap-8">
                <RetroCard title="VECTOR_DISTRIBUTION" headerColor="sapphire">
                  <div className="flex items-center gap-2 mb-4 text-[10px] tracking-widest text-cyber-ice/50">
                    <Cpu size={12} />
                    <span>NEURAL_FREQUENCY_MAPPING</span>
                  </div>
                  <AnalysisCharts weightedFrequencies={weightedFrequencies} />
                </RetroCard>
                <RetroCard title="ANALYTIC_PROTOCOLS" headerColor="ice">
                  <div className="text-[11px] space-y-4 font-mono leading-relaxed">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-cyber-neon">
                        <span>P-01: TEMPORAL_DECAY</span>
                        <span className="opacity-40">32-BIT</span>
                      </div>
                      <p className="text-cyber-ice/70">
                        Batch weighting applied at <span className="text-white">110% compounded intensity</span> per 5-draw intervals. Recency priority enabled.
                      </p>
                    </div>
                    <div className="h-px bg-cyber-ice/10" />
                    <div>
                      <div className="flex justify-between items-center mb-1 text-cyber-neon">
                        <span>P-02: CLUSTER_DETECTION</span>
                        <span className="opacity-40">HOTSPOT</span>
                      </div>
                      <p className="text-cyber-ice/70">
                        Isolating <span className="text-white">top 18 probabilistic hotspots</span> for set generation. Noise reduction active.
                      </p>
                    </div>
                  </div>
                </RetroCard>
              </div>
            </div>
            <RetroCard className="py-3 px-6" headerColor="sapphire">
              <div className="flex justify-between items-center text-[9px] text-cyber-ice/30 uppercase tracking-[0.5em] font-bold">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-neon" />
                  RETROSIX_ANALYST // LUXURY_REVISION_V2.0
                </span>
                <span>SECURE_SESSION_ENCRYPTED</span>
                <span>© 1994-2025 CYBER-CORE SYSTEMS</span>
              </div>
            </RetroCard>
          </div>
        </div>
      </main>
    </div>
  );
}