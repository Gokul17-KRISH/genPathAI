import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Target, Clock } from "lucide-react";

interface InsightCardsProps {
  insights: string[];
}

const insightIcons = [Lightbulb, TrendingUp, Target, Clock];

export function InsightCards({ insights }: InsightCardsProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="space-y-3 mt-2">
      {insights.map((insight, index) => {
        const Icon = insightIcons[index % insightIcons.length];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
          >
            <div className="p-2 rounded-lg bg-indigo-100 h-fit">
              <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">{insight}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
