import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Loader2, RefreshCw, LayoutDashboard, Sparkles, Target, Zap, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { useGenPath } from "@/context/GenPathContext";
import { cn } from "@/lib/utils";

export function DashboardPage() {
  const { profile, dashboard, learningPath, refreshDashboard } = useGenPath();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-semibold tracking-wide">Syncing Data...</p>
      </div>
    );
  }

  const completedCount = learningPath.filter(m => m.status === "Completed").length;

  return (
    <div className="h-full flex flex-col space-y-10">
      {/* Header / Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Session</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome, {profile.name.split(" ")[0]}
          </h1>
          <p className="text-slate-600 font-medium">
            Tracking progress for <span className="font-bold text-slate-900">{profile.goal || "Your Certification"}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={refreshDashboard}
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition-all h-10 rounded-lg shadow-sm"
          >
            <RefreshCw className="w-4 h-4 mr-2 text-indigo-500" />
            Sync Pulse
          </Button>
        </div>
      </motion.div>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Readiness & Insights */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Certification Readiness</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900">{dashboard.readiness}%</span>
                <span className="text-sm font-bold text-emerald-600">Ready</span>
              </div>
            </div>
            
            <div className="h-px bg-slate-100" />
            
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Pass Probability</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-indigo-600">{dashboard.passProbability}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-900 tracking-widest uppercase">AI Insights</h2>
            </div>
            {dashboard.insights.length > 0 ? (
              <div className="space-y-4">
                {dashboard.insights.map((insight, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-sm font-medium text-slate-700 leading-relaxed">
                    {insight}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No active insights generated yet.</p>
            )}
          </div>

        </div>

        {/* Middle Column: Skills & Progress */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Skill Confidence</h2>
            </div>
            
            <div className="space-y-5">
              {dashboard.skillConfidence.length > 0 ? (
                dashboard.skillConfidence.map((sc, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold text-slate-700">{sc.title}</span>
                      <span className="text-xs font-bold text-indigo-600">{sc.ratingPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sc.ratingPercent}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 font-medium">No skills assessed.</p>
              )}
            </div>
          </div>
          <ProgressChart weeklyProgress={[40, 65, 30, 85]} />

        </div>

        {/* Right Column: Learning Modules List */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-12rem)] min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Learning Modules</h2>
              <div className="px-3 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-600">
                {completedCount} / {learningPath.length}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {learningPath.length > 0 ? (
                learningPath.map((mod, idx) => (
                  <div key={mod.id} className={cn(
                    "p-4 rounded-xl border transition-all relative overflow-hidden",
                    mod.status === "Completed" ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-100 hover:border-indigo-200"
                  )}>
                    {mod.status === "Completed" && (
                      <div className="absolute top-4 right-4 text-emerald-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    <h3 className={cn(
                      "text-sm font-bold mb-1 pr-6",
                      mod.status === "Completed" ? "text-emerald-900" : "text-slate-900"
                    )}>
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2">
                      {mod.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-500">Path not generated</p>
                </div>
              )}
            </div>
            
            <div className="pt-4 mt-auto border-t border-slate-100">
              <Link to="/learning">
                <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-sm transition-all">
                  View Full Roadmap
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
