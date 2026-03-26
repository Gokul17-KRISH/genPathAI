import { motion } from "framer-motion";
import { LearningModule } from "@/types";
import { ModuleCard } from "./ModuleCard";

interface TimelineProps {
  modules: LearningModule[];
}

export function Timeline({ modules }: TimelineProps) {
  const totalWeeks = modules.reduce((sum, m) => sum + m.durationWeeks, 0);

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-4 border border-slate-700/50"
      >
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">
            Total Modules: <span className="text-white font-medium">{modules.length}</span>
          </span>
          <span className="text-slate-400">
            Estimated Duration: <span className="text-white font-medium">{totalWeeks} weeks</span>
          </span>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            index={index}
            isLast={index === modules.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
