import React, { useState, useMemo } from 'react';
import { getCombinedDraws } from '@/lib/data';
import { MarkSixAnalyzer } from '@/lib/analyzer';
import { RetroCard } from '@/components/ui/retro-card';
import { DrawHistory } from '@/components/DrawHistory';
import { AnalysisCharts } from '@/components/AnalysisCharts';
import { PredictionTerminal } from '@/components/PredictionTerminal';
import { ManualEntryForm } from '@/components/ManualEntryForm';
import { RulesSummary } from '@/components/RulesSummary';
import { Cloud, LayoutDashboard, Database, Activity, ShieldCheck, Zap } from 'lucide-react';
export function HomePage() {
  const [iteration, setIteration] = useState(0);
  const [dataVersion, setDataVersion] = useState(0);
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
    setIteration(prev => prev + 1);
  };
  const handleDataUpdate = () => {
    setDataVersion(prev => prev + 1);
    setIteration(0);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cf-orange rounded-md flex items-center justify-center">
              <Cloud className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-cf-gray-900">
              RetroSix <span className="text-cf-orange">Analyst</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <span className="text-sm font-medium text-cf-gray-600 hover:text-cf-orange transition-colors cursor-pointer">Dashboard</span>
            <span className="text-sm font-medium text-cf-gray-600 hover:text-cf-orange transition-colors cursor-pointer">Analytics</span>
            <span className="text-sm font-medium text-cf-gray-600 hover:text-cf-orange transition-colors cursor-pointer">Settings</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase">Operational</span>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Stats */}
      <section className="bg-white border-b py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                <Database className="text-cf-blue w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Synced Nodes</p>
                <p className="text-2xl font-bold text-cf-gray-900">{draws.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                <Activity className="text-cf-orange w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Heuristic Engine</p>
                <p className="text-2xl font-bold text-cf-gray-900">v4.0 Alpha</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                <ShieldCheck className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">System Integrity</p>
                <p className="text-2xl font-bold text-cf-gray-900">Secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <RetroCard title="Prediction Results" className="min-h-[500px]">
              <PredictionTerminal
                predictions={predictions}
                onRefresh={handleRefresh}
              />
            </RetroCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RetroCard title="Probability Distribution">
                <AnalysisCharts weightedFrequencies={weightedFrequencies} />
              </RetroCard>
              <RetroCard title="Heuristic Insights">
                <RulesSummary
                  stats={hotColdStats}
                  pairs={frequentPairs}
                  coverage={coverageSet}
                />
              </RetroCard>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <RetroCard title="Historical Data Archive" className="h-[500px]">
              <DrawHistory draws={draws} />
            </RetroCard>
            <RetroCard title="Update Data Pool">
              <ManualEntryForm onSuccess={handleDataUpdate} />
            </RetroCard>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <Zap className="w-4 h-4 text-cf-orange" />
            <span>Powered by Cloudflare Workers & Durable Objects</span>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2025 RetroSix Analyst. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}