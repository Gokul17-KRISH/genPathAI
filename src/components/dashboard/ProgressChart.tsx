import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface ProgressChartProps {
  weeklyProgress: number[];
}

export function ProgressChart({ weeklyProgress }: ProgressChartProps) {
  // Normalize values or use them directly if they are percentages
  const maxValue = Math.max(...weeklyProgress, 1);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-7">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-500 fill-amber-500/10" />
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Weekly Progress</h2>
      </div>

      <div className="flex items-end justify-between h-32 gap-3 px-1">
        {weeklyProgress.map((value, index) => {
          // Normalize to a percentage of the container height (at least 5% to be visible)
          const barHeight = Math.max((value / maxValue) * 100, 5);
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
              {/* Bar Container */}
              <div className="w-full relative h-full flex items-end">
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20">
                  <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap">
                    {value}% Completion
                  </div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                {/* The Bar */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${barHeight}%`, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1, 
                    ease: [0.33, 1, 0.68, 1] 
                  }}
                  className="w-full bg-gradient-to-t from-indigo-500 via-indigo-400 to-indigo-300 rounded-t-lg shadow-[0_-4px_12px_rgba(99,102,241,0.1)] group-hover:from-indigo-600 group-hover:via-indigo-500 group-hover:to-indigo-400 transition-all cursor-pointer relative"
                >
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity rounded-t-lg" />
                </motion.div>
              </div>

              {/* Label */}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">W{index + 1}</span>
            </div>
          );
        })}
      </div>
      
      {/* Footer stats */}
      <div className="pt-5 border-t border-slate-50 flex justify-between items-center text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-tight">Active Velocity</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-900 font-black">
            {Math.round(weeklyProgress.reduce((a, b) => a + b, 0) / (weeklyProgress.length || 1))}% Avg
          </span>
        </div>
      </div>
    </div>
  );
}
