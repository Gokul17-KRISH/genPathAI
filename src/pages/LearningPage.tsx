import { motion } from "framer-motion";
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  BarChart3,
  HelpCircle,
  PlayCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useGenPath } from "@/context/GenPathContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LearningPage() {
  const { profile, learningPath, updateModuleStatus } = useGenPath();

  const totalDurationWeeks = learningPath.reduce((acc, curr) => acc + curr.durationWeeks, 0);
  const totalModules = learningPath.length;

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'intermediate': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'advanced': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Your Learning Path</h1>
          <p className="text-slate-600 font-medium text-lg">
            Roadmap for <span className="font-semibold text-slate-900">{profile.goal || "Your Certification"}</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-6 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Modules</div>
              <div className="text-lg font-bold text-indigo-600 leading-none">{totalModules}</div>
            </div>
            <div className="w-[1px] h-8 bg-slate-200"></div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Duration</div>
              <div className="text-lg font-bold text-emerald-600 leading-none">{totalDurationWeeks} weeks</div>
            </div>
          </div>
          
          <Link to="/assessment">
            <Button variant="outline" className="h-14 px-6 rounded-xl font-bold text-slate-700 hover:bg-slate-50">
              Adjust Assessment
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="h-14 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm flex items-center gap-2">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>


      {/* Vertical Timeline Curriculum */}
      <div className="relative max-w-4xl mx-auto space-y-8 pt-6">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[31px] top-6 bottom-0 w-[2px] bg-slate-200 hidden md:block" />

        {learningPath.map((module, idx) => (
          <motion.div 
            key={module.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-0 md:pl-20 group"
          >
            {/* Timeline Dot Number */}
            <div className="absolute left-0 top-6 w-16 h-16 hidden md:flex items-center justify-center z-10 bg-white border-2 border-slate-200 rounded-full text-xl font-black text-slate-400 shadow-sm transition-all group-hover:border-indigo-400 group-hover:text-indigo-600">
              {idx + 1}
            </div>

            {/* Module Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group/card">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-5">
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    <span className="md:hidden text-indigo-600 mr-2">{idx + 1}.</span>
                    {module.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed max-w-xl">
                    {module.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider border",
                      getDifficultyStyles(module.difficulty)
                    )}>
                      {module.difficulty}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600 text-sm font-bold px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <Clock className="w-4 h-4" />
                      {module.durationWeeks} weeks
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600 text-sm font-bold px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <BarChart3 className="w-4 h-4" />
                      {module.activityType}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button 
                      onClick={() => updateModuleStatus(module.id, module.status === 'Completed' ? 'Not Started' : 'Completed')}
                      className={cn(
                        "rounded-xl px-6 h-12 text-sm font-bold transition-all shadow-sm",
                        module.status === 'Completed' 
                          ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200" 
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      )}
                    >
                      {module.status === 'Completed' ? (
                        <>Completed <CheckCircle2 className="w-4 h-4 ml-2" /></>
                      ) : (
                        <>Start Module <PlayCircle className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>

                    <div className="flex items-center gap-2.5 px-4 h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-help">
                      <HelpCircle className="w-4 h-4 text-indigo-500" />
                      <span className="text-xs font-bold">{module.reason}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
        
        {learningPath.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-600">No Learning Path Generated</h3>
            <p className="text-slate-500 mt-2">Go to the Assessment page and click Generate Path to build your customized roadmap.</p>
          </div>
        )}
      </div>
    </div>
  );
}
