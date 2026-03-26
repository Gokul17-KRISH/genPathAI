import { motion } from "framer-motion";

interface ReadinessMeterProps {
  percent: number;
  passProbability: number;
}

export function ReadinessMeter({ percent, passProbability }: ReadinessMeterProps) {
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Certification Readiness</h3>
      <div className="flex flex-col items-center">
        {/* Circular Progress */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-slate-100"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="#059669"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold text-slate-900 tracking-tight"
            >
              {percent}%
            </motion.span>
            <span className="text-sm font-medium text-slate-500 mt-1">Ready</span>
          </div>
        </div>

        {/* Pass Probability */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center w-full pt-6 border-t border-slate-100"
        >
          <div className="text-sm font-medium text-slate-500">Estimated Pass Probability</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">{passProbability}%</div>
          <div className="text-xs text-slate-400 mt-2">Based on your progress and skill mastery</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
