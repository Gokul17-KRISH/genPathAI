import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: string;
  description: string;
  rating: number;
  learnUrl?: string;
  onRatingChange: (rating: number) => void;
  index: number;
  key?: string | number;
}

export function SkillCard({
  skill,
  description,
  rating,
  learnUrl,
  onRatingChange,
  index,
}: SkillCardProps) {
  const ratingLabels = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];

  const handleLearnBasics = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (learnUrl) {
      window.open(learnUrl, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ 
        rotateX: 5, 
        rotateY: 5, 
        translateZ: 10,
        transition: { duration: 0.2 } 
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="three-d-tile group relative"
    >
      <div className="glass-card rounded-2xl p-6 border border-white/10 h-full flex flex-col gap-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex justify-between items-start">
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-xl font-black text-white tracking-tight uppercase italic group-hover:text-purple-400 transition-colors duration-300">
              {skill}
            </h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed max-w-[250px]">
              {description}
            </p>
          </div>
          
          {learnUrl && (
            <button
              onClick={handleLearnBasics}
              style={{ transform: "translateZ(40px)" }}
              className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-300 border border-white/5 hover:border-purple-500/30"
              title="Learn basics"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative z-10 mt-auto space-y-6" style={{ transform: "translateZ(20px)" }}>
          {/* Rating Controls */}
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => onRatingChange(value)}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-black transition-all duration-500 border",
                  rating === value
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                    : "bg-slate-900/50 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300"
                )}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span>NOVICE</span>
              <motion.span
                key={rating}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-purple-400"
              >
                {ratingLabels[rating - 1]}
              </motion.span>
              <span>EXPERT</span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(rating / 5) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-sm" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
