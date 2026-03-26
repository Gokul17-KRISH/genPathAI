import { motion } from "framer-motion";
import { SkillRating } from "../../types";

interface ConfidencePreviewProps {
  ratings: SkillRating[];
}

export function ConfidencePreview({ ratings }: ConfidencePreviewProps) {
  const averageRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 0;
  
  const confidencePercent = Math.round((averageRating / 5) * 100);

  const getConfidenceLevel = (percent: number) => {
    if (percent >= 80) return { label: "OPTIMIZED", color: "text-cyan-400", glow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]" };
    if (percent >= 60) return { label: "STABLE", color: "text-blue-400", glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]" };
    if (percent >= 40) return { label: "CALIBRATING", color: "text-purple-400", glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]" };
    return { label: "INITIALIZING", color: "text-pink-400", glow: "shadow-[0_0_20px_rgba(236,72,153,0.4)]" };
  };

  const confidence = getConfidenceLevel(confidencePercent);

  return (
    <div className="space-y-8 relative z-10">
      {/* Main Gauge */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48 group">
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-1000 ${confidence.glow}`} />
          
          <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
              fill="none"
              strokeDasharray="528"
              strokeDashoffset="0"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="84"
              stroke="url(#main-gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 528 }}
              animate={{
                strokeDashoffset: 528 - (confidencePercent / 100) * 528,
              }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="main-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div
              key={confidencePercent}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-1"
            >
              <span className="text-5xl font-black text-white italic tracking-tighter">
                {confidencePercent}
                <span className="text-xl text-purple-500">%</span>
              </span>
              <div className={`text-[10px] font-black tracking-[0.3em] uppercase ${confidence.color}`}>
                {confidence.label}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mini Gauges */}
      <div className="grid grid-cols-1 gap-4">
        {ratings.map((rating, index) => (
          <motion.div
            key={rating.skill}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Module {index + 1}</span>
                <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{rating.skill}</span>
              </div>
              <span className="text-xs font-black text-purple-500">{rating.rating}/5</span>
            </div>
            
            <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(rating.rating / 5) * 100}%` }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
