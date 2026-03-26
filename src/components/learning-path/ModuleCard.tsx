import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, BookOpen, Video, Code, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LearningModule } from "@/types";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: LearningModule;
  index: number;
  isLast: boolean;
  key?: string | number;
}

const activityIcons = {
  Watch: Video,
  Read: BookOpen,
  Practice: Code,
  Project: Briefcase,
};

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function ModuleCard({ module, index, isLast }: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = activityIcons[module.activityType];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative pl-8"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-12 w-0.5 h-[calc(100%-24px)] bg-gradient-to-b from-purple-500 to-pink-500/30" />
      )}

      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        className="absolute left-0 top-5 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
      >
        <span className="text-xs font-bold text-white">{index + 1}</span>
      </motion.div>

      {/* Card */}
      <div className="glass-card rounded-xl p-5 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Icon className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-3">{module.description}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className={difficultyColors[module.difficulty]}>
                {module.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{module.durationWeeks} week{module.durationWeeks > 1 ? "s" : ""}</span>
              </div>
              <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-600">
                {module.activityType}
              </Badge>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {module.relatedSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <h4 className="text-sm font-medium text-purple-400 mb-2">
                  Why this module?
                </h4>
                <p className="text-sm text-slate-300">{module.whyThis}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
