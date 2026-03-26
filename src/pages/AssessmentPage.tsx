import { motion } from "framer-motion";
import { ShieldCheck, Target, Server, ExternalLink, Sparkles } from "lucide-react";
import { useGenPath } from "@/context/GenPathContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export function AssessmentPage() {
  const { profile, assessmentState, updateSkillRating, generatePath, isGenerating } = useGenPath();
  const { confidenceSummary, skillsForAssessment } = assessmentState;
  const navigate = useNavigate();

  const handleGeneratePath = async () => {
    await generatePath();
    navigate("/learning");
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Skill Diagnostics</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Assessment Matrix</h1>
          <p className="text-slate-600 mt-2 max-w-2xl font-medium">
            Real-time synchronization between your current <span className="font-semibold text-slate-900">skill profile</span> and <span className="text-indigo-600 font-semibold">{profile.goal || "your selected path"}</span> certification requirements.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Server className="w-6 h-6 text-emerald-600" />
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">System Status</div>
              <div className="text-sm font-bold text-slate-900 leading-none">Calibrated</div>
            </div>
          </div>
          <Button 
            onClick={handleGeneratePath} 
            disabled={isGenerating}
            className="h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm transition-all flex items-center gap-2"
          >
            {isGenerating ? "Generating..." : "Generate Path"}
            <Sparkles className={cn("w-5 h-5", isGenerating && "animate-spin")} />
          </Button>
        </div>
      </motion.div>

      {/* Main Matrix Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left: Confidence Analytics */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Confidence Analytics</div>
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke={confidenceSummary.status === "INITIALIZING" ? "#f43f5e" : confidenceSummary.status === "STABILIZING" ? "#eab308" : "#22c55e"}
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={(2 * Math.PI * 80) - ((confidenceSummary.confidencePercent / 100) * (2 * Math.PI * 80))}
                  strokeLinecap="round"
                  fill="transparent"
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-slate-900 tracking-tight">{confidenceSummary.confidencePercent}%</span>
              </div>
            </div>
            <div className={cn(
              "px-4 py-2 rounded-lg font-bold text-sm tracking-widest uppercase",
              confidenceSummary.status === "INITIALIZING" && "bg-rose-50 text-rose-600",
              confidenceSummary.status === "STABILIZING" && "bg-yellow-50 text-yellow-600",
              confidenceSummary.status === "OPTIMIZED" && "bg-emerald-50 text-emerald-600"
            )}>
              {confidenceSummary.status}
            </div>
            <div className="text-xs text-slate-400 mt-4 font-semibold uppercase tracking-wider">Avg Rating: {confidenceSummary.averageRating}</div>
          </div>
        </div>

        {/* Middle: Skill Matrix Grid */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Domain Proficiency
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skillsForAssessment.map((skill, idx) => (
                <motion.div 
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-slate-900 line-clamp-1 pr-2">{skill.title}</h3>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md shrink-0">
                        {skill.rating}/5
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 h-8">{skill.description}</p>
                    
                    <a 
                      href={skill.learnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors mb-5 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit"
                    >
                      Learn More <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => updateSkillRating(skill.id, star)}
                          className={cn(
                            "flex-1 h-3 rounded-full transition-all duration-300",
                            star <= skill.rating 
                              ? "bg-indigo-600" 
                              : "bg-slate-200 hover:bg-slate-300"
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <span>Novice</span>
                      <span className="text-indigo-600 font-bold">{skill.level}</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
