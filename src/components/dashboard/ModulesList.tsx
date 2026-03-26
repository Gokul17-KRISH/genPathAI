import { motion } from "framer-motion";
import { CheckCircle2, Circle, PlayCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LearningModule, ModuleStatus } from "@/types";
import { cn } from "@/lib/utils";

interface ModulesListProps {
  modules: LearningModule[];
  onStatusChange: (moduleId: string, status: ModuleStatus) => void;
}

const statusConfig = {
  not_started: {
    icon: Circle,
    label: "Not Started",
    color: "text-slate-400",
    bg: "bg-slate-700/50",
  },
  in_progress: {
    icon: PlayCircle,
    label: "In Progress",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
};

export function ModulesList({ modules, onStatusChange }: ModulesListProps) {
  const cycleStatus = (current: ModuleStatus): ModuleStatus => {
    const cycle: ModuleStatus[] = ["not_started", "in_progress", "completed"];
    const currentIndex = cycle.indexOf(current);
    return cycle[(currentIndex + 1) % cycle.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 border border-slate-700/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Learning Modules</h3>
        <span className="text-sm text-slate-400">
          {modules.filter((m) => m.status === "completed").length} / {modules.length} completed
        </span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {modules.map((module, index) => {
          const status = statusConfig[module.status];
          const Icon = status.icon;
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onStatusChange(module.id, cycleStatus(module.status))}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                "hover:bg-slate-700/30 border border-transparent hover:border-slate-600/50",
                module.status === "completed" && "opacity-70"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", status.color)} />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", 
                  module.status === "completed" ? "text-slate-400 line-through" : "text-white"
                )}>
                  {module.title}
                </p>
                <p className="text-xs text-slate-500 truncate">{module.description}</p>
              </div>
              <Badge variant="outline" className={cn("text-xs", status.bg, status.color)}>
                {status.label}
              </Badge>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
