import { motion } from "framer-motion";

interface ReadinessMeterProps {
  percent: number;
  passProbability: number;
}

export function ReadinessMeter({ percent, passProbability }: ReadinessMeterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Certification Readiness</h3>

      <div className="flex flex-col items-center w-full gap-6">
        {/* Percentage Label */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-slate-900 tracking-tight"
          >
            {percent}%
          </motion.span>
          <div className="text-sm font-medium text-slate-500 mt-1">Ready</div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full">
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Pass Probability */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center w-full pt-6 border-t border-slate-100"
        >
          <div className="text-sm font-medium text-slate-500">Estimated Pass Probability</div>
          <div className="text-3xl font-bold text-emerald-600 mt-2">{passProbability}%</div>
          <div className="text-xs text-slate-400 mt-2">Based on your progress and skill mastery</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
