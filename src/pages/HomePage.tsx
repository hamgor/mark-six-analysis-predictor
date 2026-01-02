import React, { useState, useMemo } from 'react';
import { RAW_DATA, parseData } from '@/lib/data';
import { MarkSixAnalyzer } from '@/lib/analyzer';
import { RetroCard } from '@/components/ui/retro-card';
import { DrawHistory } from '@/components/DrawHistory';
import { AnalysisCharts } from '@/components/AnalysisCharts';
import { PredictionTerminal } from '@/components/PredictionTerminal';
import { Activity, Database, Cpu, Zap } from 'lucide-react';
export function HomePage() {
  const [iteration, setIteration] = useState(0);
  const draws = useMemo(() => parseData(RAW_DATA), []);
  const analyzer = useMemo(() => new MarkSixAnalyzer(draws), [draws]);
  const weightedFrequencies = useMemo(() => analyzer.getWeightedFrequencies(), [analyzer]);
  const predictions = useMemo(() => {
    // We use iteration to trigger re-generation if needed
    void iteration;
    return analyzer.generatePredictions(3);
  }, [analyzer, iteration]);
  const handleRefresh = () => {
    setIteration(prev => prev + 1);
  };
  return (
    <div className="relative min-h-screen">
      {/* Visual Overlays */}
      <div className="crt-overlay" />
      <div className="scanline" />
      {/* Header Marquee */}
      <header className="bg-retro-green/10 border-b border-retro-green p-2 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] font-bold">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-retro-cyan">
              <Activity size={14} /> SYSTEM_STATUS: ONLINE
            </span>
            <span className="hidden md:inline opacity-50">LOCATION: HK_MARK_SIX_NODE</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="animate-pulse text-retro-pink" />
            <span>CORE_TEMP: 32.4°C</span>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Data Log */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <RetroCard 
              title="HISTORICAL_ARCHIVE" 
              className="h-[400px] lg:h-[600px]"
              headerColor="green"
            >
              <div className="flex items-center gap-2 mb-4 text-xs opacity-60">
                <Database size={12} />
                <span>TOTAL_ENTRIES: {draws.length}</span>
              </div>
              <DrawHistory draws={draws} />
            </RetroCard>
            <RetroCard title="SYS_LOG" className="h-[150px]" headerColor="cyan">
              <div className="text-[10px] space-y-1 opacity-70">
                <p>&gt; BOOTING ANALYZER_V4.2...</p>
                <p>&gt; PARSING HISTORICAL_DATA_BUFFER...</p>
                <p>&gt; APPLYING TIME_DECAY_WEIGHTS (1.1x)...</p>
                <p className="text-retro-cyan">&gt; HEURISTIC ENGINE READY.</p>
              </div>
            </RetroCard>
          </div>
          {/* Center/Right: Analysis and Predictions */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RetroCard 
                title="PREDICTION_ENGINE" 
                className="h-[450px]" 
                headerColor="pink"
              >
                <PredictionTerminal 
                  predictions={predictions} 
                  onRefresh={handleRefresh} 
                />
              </RetroCard>
              <div className="flex flex-col gap-6">
                <RetroCard title="HOTSPOT_DISTRIBUTION" headerColor="green">
                  <div className="flex items-center gap-2 mb-4 text-xs">
                    <Cpu size={12} className="text-retro-green" />
                    <span>WEIGHTED_FREQUENCY_ANALYSIS</span>
                  </div>
                  <AnalysisCharts weightedFrequencies={weightedFrequencies} />
                </RetroCard>
                <RetroCard title="STATISTICAL_RULES" headerColor="cyan">
                  <div className="text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="opacity-60">RULE_ID: 01</span>
                      <span className="text-retro-cyan">TIME_WEIGHTING</span>
                    </div>
                    <p className="leading-relaxed">
                      Latest draws have a <span className="text-white">10% compounded weight</span> increase every 5 entries. Modern patterns prioritize current trends over legacy data.
                    </p>
                    <div className="border-t border-retro-cyan/20 pt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="opacity-60">RULE_ID: 02</span>
                        <span className="text-retro-pink">HOTSPOT_FOCUS</span>
                      </div>
                      <p className="leading-relaxed">
                        Predictions are constrained to the <span className="text-white">top 18 weighted numbers</span> (Hotspots).
                      </p>
                    </div>
                  </div>
                </RetroCard>
              </div>
            </div>
            <RetroCard className="py-2 px-4" headerColor="green">
              <div className="flex justify-between items-center text-[10px] opacity-40 uppercase tracking-tighter">
                <span>RETROSIX_ANALYST // BUILD 8429</span>
                <span>ENC: AES-256-BIT</span>
                <span>(C) 1994 CYBER-CORE SYSTEMS</span>
              </div>
            </RetroCard>
          </div>
        </div>
      </main>
    </div>
  );
}