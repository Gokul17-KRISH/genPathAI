import { motion } from "framer-motion";

interface ProgressChartProps {
  weeklyProgress: number[];
}

export function ProgressChart({ weeklyProgress }: ProgressChartProps) {
  const maxValue = Math.max(...weeklyProgress, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-6">Weekly Progress</h3>
      <div className="flex items-end justify-between gap-3 h-40">
        {weeklyProgress.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 5)}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full bg-indigo-500 rounded-t-md relative group hover:bg-indigo-600 transition-colors cursor-default"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="text-xs font-semibold text-white bg-slate-800 px-2.5 py-1 rounded shadow-md">
                    {value}
                  </span>
                </div>
              </motion.div>
              <span className="text-xs font-medium text-slate-500">W{index + 1}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Total Completed</span>
          <span className="text-slate-900 font-bold bg-slate-50 px-3 py-1 rounded-lg">
            {weeklyProgress.reduce((a, b) => a + b, 0)} modules
          </span>
        </div>
      </div>
    </motion.div>
  );
}
